# Ekosistem Kinetika

Gambaran lengkap seluruh komponen dalam ekosistem Kinetika, relasi antar komponen, dan arah pengembangannya.

---

## Peta Ekosistem

```
KINETIKA ECOSYSTEM
│
├── INFRASTRUKTUR
│   ├── ir0nm0nk              Edge compute node (Proxmox)
│   │   ├── Dual Xeon
│   │   ├── RTX 3060 12GB (CUDA)
│   │   └── Tailscale mesh
│   │
│   └── Kinetika Network
│       ├── IP scheme terstruktur (node numbering)
│       ├── Tailscale VPN mesh
│       └── Gateway NPM + Authelia (SSO)
│
├── HOMELAB SERVICES (di atas Proxmox)
│   ├── Core    : Proxmox, Tailscale
│   ├── Infra   : Gateway NPM, Authelia, Grafana, Uptime Kuma
│   ├── Storage : Nextcloud, Immich, Jellyfin, Navidrome
│   ├── Media   : Prowlarr, Sonarr, Radarr, qBittorrent, Bazarr, Overseerr
│   └── Bisnis  : n8n, Kost HQ, ir0nm0nk dashboard
│
├── OS LAYER
│   └── KinetikaOS             Arch-based distro
│       ├── Workstation        GNOME, AMD/ROCm optimized
│       │   └── Zephyr00t      R9 6900HS + RX 6800S 8GB
│       └── Server             Headless, homelab deployment
│
├── APLIKASI
│   ├── Kinetika HQ            Dashboard homelab (HTML/CSS/JS)
│   └── Kost HQ                Property management (WhatsApp/Baileys)
│
└── AI LAYER
    ├── Local LLM (ir0nm0nk)   Ollama + CUDA (RTX 3060)
    └── Local LLM (Zephyr00t)  Ollama + ROCm (RX 6800S)
```

---

## Komponen Detail

### ir0nm0nk
Edge compute node dan sekaligus identitas visual seluruh sistem. Node ini menjalankan Proxmox dan menjadi host utama homelab. Nama ini juga dipakai sebagai nama design system Kinetika.

**Specs:** Dual Xeon · RTX 3060 12GB · Proxmox

### Zephyr00t
Workstation utama. Laptop ASUS G14 2022 dengan full AMD stack — tidak ada drama hybrid graphics, ROCm berjalan clean dengan driver open source.

**Specs:** R9 6900HS · RX 6800S 8GB · Ubuntu → KinetikaOS (planned)

### Kinetika HQ
Single-page launcher untuk semua services homelab. Diorganisir dalam kategori (Core, Infra, Storage, Media, Bisnis) dengan node numbering yang terintegrasi ke skema IP network.

**Stack:** HTML, CSS, JavaScript (vanilla)
**Status:** Live

### Kost HQ
Aplikasi manajemen properti kost berbasis WhatsApp. Menggunakan Baileys untuk integrasi WhatsApp tanpa official API.

**Stack:** Baileys (Node.js)
**Status:** Live

### KinetikaOS
Arch-based Linux distribution dengan dua edisi: Workstation (GNOME, AMD-optimized) dan Server (headless). Foundation seluruh ekosistem software Kinetika.

**Base:** Arch Linux
**DE:** GNOME
**Status:** In progress

---

## Alur Data & Konektivitas

```
Internet
    ↓
Tailscale mesh (ir0nm0nk ↔ Zephyr00t ↔ devices lain)
    ↓
Gateway NPM (reverse proxy)
    ↓
Authelia (SSO)
    ↓
Services (HQ, Jellyfin, Nextcloud, dll)
```

---

## Node Numbering Scheme

Setiap node dan service memiliki nomor yang terintegrasi ke skema IP:

| Range | Kategori |
|---|---|
| 088–099 | Core infrastructure |
| 100–109 | Infra services |
| 130–139 | Media & download |
| 170–179 | Business apps |
| 222+ | Edge nodes |

---

## Roadmap

### Fase 1 — Foundation (sekarang)
- [x] Homelab live (Proxmox + semua services)
- [x] Kinetika HQ dashboard
- [x] Kost HQ live
- [x] Design system draft
- [ ] KinetikaOS Workstation — install & konfigurasi di VM
- [ ] KinetikaOS Workstation — bare metal di Zephyr00t

### Fase 2 — Kinetika OS Stable
- [ ] KinetikaOS installer script
- [ ] GNOME theme ir0nm0nk
- [ ] ROCm stack pre-configured
- [ ] KinetikaOS Server edition

### Fase 3 — AX Layer
- [ ] API layer Kinetika HQ
- [ ] Standardisasi data format antar komponen
- [ ] Agent-friendly CLI
- [ ] n8n workflows untuk homelab automation

### Fase 4 — Product
- [ ] Kost HQ v2 (lebih dari WhatsApp)
- [ ] Software berbasis AX philosophy
- [ ] Kinetika sebagai platform terbuka