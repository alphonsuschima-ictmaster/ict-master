require('dotenv').config();
const express    = require('express');
const crypto     = require('crypto');
const axios      = require('axios');
const fs         = require('fs');
const path       = require('path');
const Database   = require('better-sqlite3');
const nodemailer = require('nodemailer');

const app = express();
const db  = new Database(process.env.DB_PATH || 'app.db');

const PAYSTACK_SECRET  = process.env.PAYSTACK_SECRET;
const BASE_URL         = process.env.BASE_URL || 'http://localhost:3000';
const PRICE_KOBO       = Number(process.env.PRICE_KOBO || 100000);
const REISSUE_FEE_KOBO = Number(process.env.REISSUE_FEE_KOBO || 20000);
const ADMIN_KEY        = process.env.ADMIN_KEY;
const SUPPORT_WHATSAPP = process.env.SUPPORT_WHATSAPP || '2347073519187';
const BULKSMS_API_KEY  = process.env.BULKSMS_API_KEY;
const BULKSMS_SENDER   = process.env.BULKSMS_SENDER || 'ICTMASTER';

const FREE = [1, 2];
const PAID = [3, 4, 5, 6, 7, 8, 9, 10];

/* ==================== DATABASE ==================== */
db.exec(`
CREATE TABLE IF NOT EXISTS purchases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference TEXT UNIQUE,
  email TEXT,
  phone TEXT,
  pin TEXT,
  paid INTEGER DEFAULT 0,
  device_id TEXT,
  device_locked_at TEXT,
  reissue_count INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  purchase_id INTEGER,
  device_id TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS unlock_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT,
  at TEXT DEFAULT CURRENT_TIMESTAMP
);
`);

/* ==================== MIDDLEWARE ==================== */
app.use(express.json({
  verify: (req, res, buf) => { req.rawBody = buf; }
}));
app.use(express.static(path.join(__dirname, 'public')));

/* ==================== HELPERS ==================== */
function pad(n) { return String(n).padStart(2, '0'); }

function readChapter(n) {
  return fs.readFileSync(
    path.join(__dirname, 'content', `chapter-${pad(n)}.md`), 'utf8'
  );
}

function extractTitle(md) {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : 'Chapter';
}

function issueToken(purchaseId, deviceId) {
  const token = crypto.randomBytes(32).toString('hex');
  db.prepare(`INSERT INTO sessions (token, purchase_id, device_id) VALUES (?,?,?)`)
    .run(token, purchaseId, deviceId);
  return token;
}

/* ==================== FREE PREVIEW ==================== */
app.get('/api/preview', (req, res) => {
  const chapters = FREE.map(n => ({
    n,
    title: extractTitle(readChapter(n)),
    body: readChapter(n)
  }));
  res.json({ chapters, locked: PAID, price: PRICE_KOBO });
});

/* ==================== CHECKOUT ==================== */
app.post('/api/checkout', async (req, res) => {
  const { email, phone } = req.body;
  if (!email) return res.status(400).json({ error: 'email_required' });

  const reference = 'ICT_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex');

  db.prepare(`INSERT INTO purchases (reference, email, phone) VALUES (?,?,?)`)
    .run(reference, email, phone || null);

  try {
    const { data } = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: PRICE_KOBO,
        reference,
        callback_url: `${BASE_URL}/?ref=${reference}`,
        metadata: { phone }
      },
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } }
    );
    res.json({ checkout_url: data.data.authorization_url, reference });
  } catch (e) {
    console.error('checkout error:', e.response?.data || e.message);
    res.status(500).json({ error: 'checkout_failed' });
  }
});

/* ==================== VERIFY ==================== */
app.get('/api/verify/:reference', async (req, res) => {
  const { reference } = req.params;
  try {
    const { data } = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } }
    );
    if (data.data.status !== 'success') return res.json({ paid: false });
    if (data.data.amount < PRICE_KOBO) return res.json({ paid: false });
    await ensurePaid(reference);
    res.json({ paid: true });
  } catch (e) {
    console.error('verify error:', e.response?.data || e.message);
    res.status(500).json({ error: 'verify_failed' });
  }
});

/* ==================== WEBHOOK ==================== */
app.post('/webhook/paystack', async (req, res) => {
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET)
    .update(req.rawBody)
    .digest('hex');

  if (hash !== req.headers['x-paystack-signature']) {
    return res.sendStatus(401);
  }

  res.sendStatus(200);

  const event = req.body;
  if (event.event !== 'charge.success') return;

  const reference = event.data.reference;

  const { data } = await axios.get(
    `https://api.paystack.co/transaction/verify/${reference}`,
    { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } }
  );
  if (data.data.status !== 'success') return;
  if (data.data.amount < PRICE_KOBO) return;

  await ensurePaid(reference);
});

/* ==================== CORE: MARK PAID ==================== */
async function ensurePaid(reference) {
  const row = db.prepare(`SELECT * FROM purchases WHERE reference = ?`).get(reference);
  if (!row) return;
  if (row.paid && row.pin) return;

  const pin = String(crypto.randomInt(100000, 999999));

  db.prepare(`UPDATE purchases SET paid = 1, pin = ? WHERE reference = ?`)
    .run(pin, reference);

  await Promise.allSettled([
    sendPinSMS(row.phone, pin),
    sendPinEmail(row.email, pin)
  ]);

  console.log(`Paid & unlocked: ${reference} -> PIN ${pin}`);
}

/* ==================== SMS VIA BULKSMS ==================== */
async function sendPinSMS(phone, pin) {
  if (!phone || !BULKSMS_API_KEY) return;
  let formatted = phone.replace(/\D/g, '');
  if (formatted.startsWith('0')) formatted = '234' + formatted.slice(1);

  try {
    await axios.post('https://www.bulksmsnigeria.com/api/v2/sms', {
      api_token: BULKSMS_API_KEY,
      to: formatted,
      from: BULKSMS_SENDER,
      sms: `Your ICT Master Guide PIN is: ${pin}\n\nEnter it in the app to unlock Modules 3-10. Works on this phone only.`,
      type: 'plain',
      channel: 'dnd'
    });
    console.log(`SMS sent to ${formatted}`);
  } catch (e) {
    console.error('SMS failed:', e.response?.data || e.message);
  }
}

/* ==================== EMAIL VIA GMAIL ==================== */
async function sendPinEmail(to, pin) {
  if (!to) return;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_APP_PASSWORD
    }
  });

  try {
    await transporter.sendMail({
      from: `"ICT Master Guide" <${process.env.MAIL_USER}>`,
      to,
      subject: 'Your ICT Master Guide PIN',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px;background:#f9f9f9;border-radius:12px;">
          <h2 style="color:#1e3a8a;">Thank you for your purchase!</h2>
          <p>Your PIN for <b>Computer Appreciation & ICT Master Guide</b>:</p>
          <div style="text-align:center;margin:24px 0;">
            <span style="background:#1e3a8a;color:#fff;font-size:32px;letter-spacing:6px;padding:16px 32px;border-radius:8px;font-weight:bold;">${pin}</span>
          </div>
          <p>Enter this PIN in the app to unlock <b>Modules 3-10</b>.</p>
          <p style="color:#666;font-size:13px;">Keep it safe. It works on one phone only.</p>
          <hr>
          <p style="color:#666;font-size:13px;">Support: <a href="https://wa.me/${SUPPORT_WHATSAPP}">WhatsApp</a></p>
        </div>
      `
    });
    console.log(`Email sent to ${to}`);
  } catch (e) {
    console.error('Email failed:', e.message);
  }
}

/* ==================== REDEEM PIN ==================== */
app.post('/api/unlock', (req, res) => {
  const { pin, device_id } = req.body;
  if (!pin || !device_id) return res.status(400).json({ error: 'missing_fields' });

  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
  const tries = db.prepare(
    `SELECT COUNT(*) c FROM unlock_attempts WHERE ip = ? AND at > datetime('now','-15 minutes')`
  ).get(ip).c;
  if (tries > 15) return res.status(429).json({ error: 'too_many_tries' });
  db.prepare(`INSERT INTO unlock_attempts (ip) VALUES (?)`).run(ip);

  const row = db.prepare(`SELECT * FROM purchases WHERE pin = ? AND paid = 1`).get(pin);
  if (!row) return res.status(403).json({ error: 'invalid_pin' });

  if (row.device_id === device_id) {
    return res.json({ token: issueToken(row.id, device_id) });
  }

  if (row.device_id && row.device_id !== device_id) {
    return res.status(409).json({
      error: 'in_use_elsewhere',
      message: 'This PIN is active on another phone. Request a new key.',
      support: SUPPORT_WHATSAPP
    });
  }

  db.prepare(
    `UPDATE purchases SET device_id = ?, device_locked_at = datetime('now') WHERE id = ?`
  ).run(device_id, row.id);

  res.json({ token: issueToken(row.id, device_id) });
});

/* ==================== SERVE PAID CHAPTERS ==================== */
app.get('/api/chapters/:n', (req, res) => {
  const token  = req.headers['x-session-token'];
  const device = req.headers['x-device-id'];

  const session = db.prepare(`SELECT * FROM sessions WHERE token = ?`).get(token);
  if (!session || session.device_id !== device) {
    return res.status(401).json({ error: 'locked' });
  }

  const buyer = db.prepare(`SELECT * FROM purchases WHERE id = ?`).get(session.purchase_id);
  const n = Number(req.params.n);
  if (!PAID.includes(n)) return res.status(400).json({ error: 'bad_chapter' });

  let text = readChapter(n);
  text = text.replace(/\n/g, `\u200B${buyer.email}\u200B\n`);

  res.type('text/plain').send(text);
});

/* ==================== ADMIN: REISSUE PIN ==================== */
app.post('/api/admin/reissue', async (req, res) => {
  if (req.headers['x-admin-key'] !== ADMIN_KEY) return res.sendStatus(401);

  const { email, reference } = req.body;
  const row = reference
    ? db.prepare(`SELECT * FROM purchases WHERE reference = ?`).get(reference)
    : db.prepare(`SELECT * FROM purchases WHERE email = ? ORDER BY id DESC LIMIT 1`).get(email);

  if (!row) return res.status(404).json({ error: 'not_found' });

  const newPin = String(crypto.randomInt(100000, 999999));

  db.prepare(
    `UPDATE purchases SET pin = ?, device_id = NULL, device_locked_at = NULL,
     reissue_count = reissue_count + 1 WHERE id = ?`
  ).run(newPin, row.id);

  db.prepare(`DELETE FROM sessions WHERE purchase_id = ?`).run(row.id);

  await Promise.allSettled([
    sendPinSMS(row.phone, newPin),
    sendPinEmail(row.email, newPin)
  ]);

  res.json({
    ok: true,
    pin: newPin,
    emailed_to: row.email,
    reissue_count: row.reissue_count + 1
  });
});

/* ==================== ADMIN: LIST SALES ==================== */
app.get('/api/admin/sales', (req, res) => {
  if (req.headers['x-admin-key'] !== ADMIN_KEY) return res.sendStatus(401);
  const rows = db.prepare(
    `SELECT id, reference, email, phone, paid, device_id, reissue_count, created_at
     FROM purchases ORDER BY id DESC LIMIT 200`
  ).all();
  res.json({ sales: rows, count: rows.length });
});

/* ==================== ADMIN: MANUAL PIN ==================== */
app.post('/api/admin/manual-pin', async (req, res) => {
  if (req.headers['x-admin-key'] !== ADMIN_KEY) return res.sendStatus(401);
  const { email, phone, reference } = req.body;

  const pin = String(crypto.randomInt(100000, 999999));
  const ref = reference || 'MANUAL_' + Date.now();

  db.prepare(
    `INSERT INTO purchases (reference, email, phone, pin, paid) VALUES (?,?,?,?,1)`
  ).run(ref, email || null, phone || null, pin);

  await Promise.allSettled([
    sendPinSMS(phone, pin),
    sendPinEmail(email, pin)
  ]);

  res.json({ ok: true, pin, reference: ref });
});

/* ==================== START ==================== */
app.listen(process.env.PORT || 3000, () => {
  console.log(`ICT Master Guide server running on port ${process.env.PORT || 3000}`);
});
