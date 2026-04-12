# AX — Agent Experience

> *Jika UX bertanya bagaimana manusia menggunakan ini — AX bertanya bagaimana agent bernavigasi dalam sistem ini, dan bagaimana kita mendesain untuk keduanya.*

---

## Latar Belakang

Konsep AX (Agent Experience) dikembangkan oleh **John Maeda** sebagai evolusi dari UX di era AI. Di mana UX berfokus pada pengalaman manusia menggunakan produk, AX berfokus pada bagaimana AI agent — sistem yang dapat mengambil tindakan secara mandiri — berinteraksi dengan, bernavigasi dalam, dan "mengalami" sebuah sistem.

Ini relevan karena semakin banyak software modern tidak hanya digunakan oleh manusia secara langsung, tapi juga oleh agent yang bertindak atas nama manusia.

---

## AX dalam Konteks Kinetika

Kinetika dibangun dengan AX sebagai prinsip desain dari awal, bukan sebagai afterthought.

**Apa artinya secara praktis:**

Setiap komponen sistem — dari struktur file konfigurasi, API homelab, hingga cara Kinetika HQ mengekspos data — dirancang agar dapat dibaca dan dioperasikan baik oleh manusia maupun agent.

```
Kinetika System
    ├── Human Interface    → GNOME, Kinetika HQ dashboard
    ├── Agent Interface    → Struktur data yang konsisten, API yang terdokumentasi
    └── Shared Layer       → Filosofi "nothing is hidden" berlaku untuk keduanya
```

---

## Tiga Pertanyaan AX

Ketika merancang komponen baru dalam ekosistem Kinetika, selalu tanyakan:

**1. Apakah agent bisa memahami struktur ini?**
Data, konfigurasi, dan output sistem harus memiliki struktur yang konsisten dan dapat diprediksi.

**2. Apakah agent bisa mengambil tindakan yang bermakna?**
Interface tidak hanya harus *readable* tapi juga *actionable* — agent harus bisa melakukan sesuatu yang berguna.

**3. Apakah hasilnya dapat diverifikasi oleh manusia?**
AX yang baik tidak menghilangkan manusia dari loop. Ia memungkinkan manusia untuk memverifikasi, mengoreksi, dan belajar dari apa yang dilakukan agent.

---

## AX vs UX vs CX

| Dimensi | UX | CX | AX |
|---|---|---|---|
| **Subjek** | Pengguna manusia | Pelanggan | AI agent |
| **Medium** | Interface visual | Seluruh perjalanan | API, struktur, data |
| **Tujuan** | Kemudahan penggunaan | Kepuasan keseluruhan | Navigabilitas + actionability |
| **Error handling** | Pesan error yang jelas | Recovery experience | Structured failure states |

---

## Implementasi Saat Ini

| Komponen | AX Consideration |
|---|---|
| **Kinetika HQ** | Struktur data layanan dieksposes secara konsisten per kategori |
| **Kost HQ** | WhatsApp sebagai interface natural language untuk agent |
| **ir0nm0nk node** | Node dalam mesh yang dapat diquery dan dioperasikan secara programatik |
| **KinetikaOS** | Konfigurasi sistem dalam format yang machine-readable (dotfiles, scripts) |

---

## Roadmap AX

- [ ] Standardisasi format data antar komponen Kinetika
- [ ] API layer untuk Kinetika HQ
- [ ] Agent-friendly CLI untuk operasi homelab
- [ ] Dokumentasi "agent contract" untuk setiap komponen

---

## Bacaan Lebih Lanjut

- John Maeda — *Design in Tech Report* (2015–2019)
- Konsep *agentic AI* dalam konteks LLM modern
- → [`philosophy.md`](./philosophy.md) untuk konteks lebih luas