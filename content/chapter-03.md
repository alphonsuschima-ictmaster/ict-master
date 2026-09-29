# MODULE 3: COMPUTER MEMORY & STORAGE

## 3.1 What Is Computer Memory?

**Memory** is the part of the computer that holds data and instructions. There are two broad types:

- **Primary Memory (Main Memory):** Directly accessible by the CPU. Fast but small and often volatile.
- **Secondary Memory (Storage):** Permanent but slower. Used for long-term storage.

The key distinction to remember: **Memory is for working. Storage is for keeping.**

---

## 3.2 Primary Memory — RAM vs. ROM

### RAM (Random Access Memory)
- **Volatile:** Loses all data when power is off.
- **Read/Write:** Data can be read from and written to.
- **Holds:** Currently running programs and open files.
- **Size:** Typically 4 GB to 32 GB in modern computers.
- **Speed:** Very fast (nanoseconds).
- **Purpose:** Working memory. The more RAM, the more apps you can run smoothly.

### ROM (Read-Only Memory)
- **Non-volatile:** Retains data even when power is off.
- **Read-Only:** Normally cannot be written to (some types like EPROM can be reprogrammed).
- **Holds:** Firmware and startup instructions (BIOS).
- **Size:** Very small — usually a few megabytes.
- **Speed:** Slower than RAM.
- **Purpose:** Boots the computer when powered on.

### RAM vs. ROM — Comparison Table

| Feature | RAM | ROM |
|---|---|---|
| Full Meaning | Random Access Memory | Read-Only Memory |
| Volatility | Volatile (loses data on power off) | Non-volatile (keeps data) |
| Access | Read & Write | Read-only (mostly) |
| Purpose | Holds running programs | Holds startup instructions (BIOS) |
| Speed | Very fast | Slower |
| Capacity | Large (GBs) | Small (MBs) |
| Cost | Expensive per GB | Cheaper |
| Upgradeable | Yes | No |
| Also called | Main memory, working memory | Firmware memory |

### RAM vs. ROM Diagram
┌──────────────────────────┐       ┌──────────────────────────┐
│          RAM             │       │          ROM             │
│  ┌────────────────────┐  │       │  ┌────────────────────┐  │
│  │ Open Word document │  │       │  │  BIOS / Firmware   │  │
│  │ Open Chrome tabs   │  │       │  │  Boot instructions │  │
│  │ Running music app  │  │       │  │  System setup      │  │
│  └────────────────────┘  │       │  └────────────────────┘  │
│                          │       │                          │
│  VOLATILE ── power off   │       │  NON-VOLATILE ── power   │
│           ── data GONE   │       │   off ── data REMAINS    │
│                          │       │                          │
│  Read / Write            │       │  Read Only               │
│  Large (4–32 GB)         │       │  Small (MB)              │
└──────────────────────────┘       └──────────────────────────┘
---

## 3.3 Secondary Storage Devices

Secondary storage is where files live permanently. Types:

- **Hard Disk Drive (HDD):** Magnetic storage with spinning platters and a moving read/write head. Large capacity (up to 10 TB+), cheaper per GB. But slower, and sensitive to shock.
- **Solid State Drive (SSD):** Uses flash memory chips, no moving parts. Much faster, quieter, more durable — but more expensive per GB.
- **USB Flash Drive (Pen Drive):** Small, portable, plug-and-play. Common sizes: 8 GB – 512 GB.
- **SD Card:** Used in phones and cameras. Sizes: microSD, miniSD, standard SD.
- **CD / DVD:** Optical media. CD holds ~700 MB, DVD holds ~4.7 GB (up to 8.5 GB dual-layer).
- **External Hard Drive:** Portable HDD or SSD connected via USB.
- **Cloud Storage:** Remote servers — Google Drive, Dropbox, OneDrive.

---

## 3.4 Storage Hierarchy — Speed vs. Capacity

The faster the storage, the smaller and more expensive it is. This is called the **storage hierarchy**.
**Units of storage (smallest to largest):**
Bit → Byte (8 bits) → Kilobyte (KB, 1024 B) → Megabyte (MB) → Gigabyte (GB) → Terabyte (TB) → Petabyte (PB) → Exabyte (EB) → Zettabyte (ZB) → Yottabyte (YB).

---

## 3.5 End-of-Module Quiz

**1. Which type of memory loses its contents when power is switched off?**
A) ROM
B) RAM
C) Hard Disk
D) Flash Drive

**2. The BIOS of a computer is stored in:**
A) RAM
B) ROM
C) Cache
D) SSD

**3. Which storage device has no moving parts?**
A) HDD
B) CD-ROM
C) SSD
D) Floppy Disk

**4. How many bits make one byte?**
A) 4
B) 8
C) 16
D) 1024

**5. Which of these has the largest storage capacity?**
A) 1 GB
B) 1 TB
C) 1 MB
D) 1 KB

### ANSWER KEY

**1. B** — RAM is volatile — the classic "lost work when NEPA took light" experience.

**2. B** — BIOS is firmware stored in ROM because it must survive power-off.

**3. C** — SSDs use flash chips; HDDs and CD-ROMs have mechanical moving parts.

**4. B** — 8 bits = 1 byte.

**5. B** — 1 TB (terabyte) = 1024 GB.
