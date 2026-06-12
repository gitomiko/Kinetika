# KINETIKA

> *Built by hand. Honest by default.*

**Kinetika** adalah ekosistem komputasi personal yang dibangun dari bawah — dari OS hingga aplikasi, dari homelab hingga lokal AI. Setiap layer dapat dimengerti, diganti, dan dikembangkan sendiri.

---

## Ekosistem

```
Kinetika
├── KinetikaOS          — Arch-based distro, fondasi seluruh sistem
│   ├── Workstation     — Daily driver, AMD-optimized, GNOME
│   └── Server          — Headless edition untuk homelab (planned)
│
├── Kinetika HQ         — Dashboard homelab (single-page launcher)
├── Kost HQ             — Manajemen properti via WhatsApp (Baileys)
└── ir0nm0nk            — Edge compute node + visual identity sistem
```

→ [`KinetikaOS`](https://github.com/gitomiko/KinetikaOS) — repo distro

---

## Filosofi

Kinetika dibangun di atas empat prinsip:

**01 — Materials show their age.**
Copper oxidizes, iron rusts — itu bukan kegagalan, itu karakter. Sistem yang jujur tidak menyembunyikan bekasnya.

**02 — Nothing is hidden.**
Sistem mengekspos strukturnya karena struktur *adalah* desainnya. Setiap layer dapat dibuka, dibaca, dan dimodifikasi.

**03 — Warmth over coolness.**
Teknologi tidak harus dingin. Ia bisa membawa tekstur dari tangan yang membuatnya.

**04 — DIY is a principle, not a limitation.**
Setiap layer dapat diketahui, diganti, dan diperbaiki. Ketergantungan adalah pilihan, bukan keharusan.

→ [`docs/philosophy.md`](./docs/philosophy.md)

---

## AX — Agent Experience

Di inti Kinetika terdapat filosofi **AX (Agent Experience)** — pendekatan desain yang memperlakukan AI agent sebagai warga negara kelas satu dalam sistem, sejajar dengan pengguna manusia.

Jika UX bertanya *bagaimana manusia menggunakan ini?*, AX bertanya *bagaimana agent bernavigasi dalam sistem ini, dan bagaimana kita mendesain untuk keduanya?*

→ [`docs/ax.md`](./docs/ax.md)

---

## Design System — ir0nm0nk

Identitas visual Kinetika. Dinamai dari edge compute node yang menginspirasinya.

**Palette:** Cloud Dancer + skala Metallic Gray, dengan aksen Patina (oxidized copper) dan Verdigris (full patina)

**Typography:** Tiga suara, satu sistem —
- `Cormorant Garamond` — display, editorial, jiwa sistem
- `Syne` — interface, label, struktur sistem
- `DM Mono` — teknikal, data, kejujuran sistem

**Tone:** Warm-dark sebagai default. Light mode dengan base Linen. Bukan cool-dark seperti kebanyakan dark theme — warm dan honest.

**Tokens:** [`design/tokens.json`](./design/tokens.json) adalah source of truth (machine-readable, AX-friendly); `tokens.css` digenerate darinya dengan gerbang kontras WCAG AA. Live preview: [`design/preview.html`](./design/preview.html).

→ [`design/README.md`](./design/README.md)

---

## Hardware Reference