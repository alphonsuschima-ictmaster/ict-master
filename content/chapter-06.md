# MODULE 6: COMPUTER NETWORKS

## 6.1 What Is a Network?

A **computer network** is two or more computers connected together so they can **share resources and data**.

### Benefits of Networking
- **Resource sharing:** Printers, files, internet connection.
- **Communication:** Email, chat, video calls.
- **Central data storage:** All users access the same data.
- **Cost saving:** One printer for 20 users.
- **Collaboration:** Teams work on the same files.

---

## 6.2 Types of Networks by Size

| Type | Full Name | Range | Example |
|---|---|---|---|
| **PAN** | Personal Area Network | ~10 m | Bluetooth between phone and earbuds |
| **LAN** | Local Area Network | One building/campus | School ICT lab, office network |
| **MAN** | Metropolitan Area Network | A city | Network linking all branches of a bank in Owerri |
| **WAN** | Wide Area Network | Country / global | The Internet; a company's national network |
| **VPN** | Virtual Private Network | Anywhere (encrypted) | Secure corporate remote access |

**Key point:** The Internet is the largest WAN in the world.

---

## 6.3 Network Topologies

**Topology** = the physical or logical arrangement of devices on a network.

### Star Topology
All devices connect to a central hub or switch.
- **Pros:** Easy to troubleshoot; one cable failure doesn't affect others.
- **Cons:** If the central hub fails, the whole network goes down.

### Bus Topology
All devices connect to a single backbone cable.
- **Pros:** Cheap, simple to set up.
- **Cons:** If the backbone breaks, everything stops; collisions are common.

### Ring Topology
Each device connects to two others, forming a closed loop. Data travels in one direction.
- **Pros:** Predictable performance.
- **Cons:** One break can bring down the whole ring.

### Mesh Topology
Every device connects to every other device.
- **Pros:** Highly reliable — many backup paths.
- **Cons:** Very expensive; complex cabling.

---

## 6.4 Network Topologies Diagram
PC                  PC   PC            PC──PC           PC────PC
 \                  │    │             │    │           │ \  / │
  \               ┌─┴────┴─┐           │    │           │  \/  │
PC──HUB──PC       │Backbone│          PC    PC          │  /\  │
  /               └─┬────┬─┘           │    │           │ /  \ │
PC                  │    │             │    │           PC────PC
                    PC   PC            PC──PC
---

## 6.5 Network Hardware Components

- **Router:** Connects different networks (e.g. your home network to the Internet). Assigns IP addresses.
- **Switch:** Connects devices within the same LAN. Sends data only to the intended device.
- **Hub:** Like a switch but sends data to ALL devices (slower, outdated).
- **Modem:** Converts digital signals to analog and back (for phone/cable lines).
- **Network Interface Card (NIC):** The hardware inside a computer that allows it to connect to a network.
- **Access Point:** Provides Wi-Fi signal to devices.
- **Ethernet Cable (Cat5/Cat6):** Wired connection between devices.
- **Repeater:** Extends the range of a signal.
- **Firewall:** Protects the network from unauthorised access.

---

## 6.6 End-of-Module Quiz

**1. What does LAN stand for?**
A) Long Area Network
B) Local Area Network
C) Linked Access Node
D) Large Array Network

**2. Which topology connects all devices to a central hub?**
A) Bus
B) Ring
C) Star
D) Mesh

**3. Which network covers an entire city?**
A) LAN
B) PAN
C) MAN
D) WAN

**4. The device that connects your home network to the Internet is a:**
A) Switch
B) Router
C) Repeater
D) NIC

**5. Which topology is the most reliable but most expensive?**
A) Star
B) Bus
C) Ring
D) Mesh

### ANSWER KEY

**1. B** — Local Area Network — covers a small area like a building.

**2. C** — Star topology uses a central hub/switch.

**3. C** — MAN (Metropolitan Area Network) covers a city.

**4. B** — The router connects LAN to the Internet.

**5. D** — Mesh offers multiple redundant paths but at high cost.
