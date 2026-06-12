# Design System — ir0nm0nk

> *Iron that rusts. Copper that oxidizes. Honest by material.*

Identitas visual Kinetika. Dinamai dari edge compute node `ir0nm0nk` yang menginspirasinya — sebuah sistem yang bekerja tanpa henti, meninggalkan bekas dari setiap penggunaan.

**Version 2.0.0**

---

## Arsitektur Token

```
tokens.json          ← source of truth (W3C Design Tokens format)
    │
    └── build-tokens.mjs     node design/build-tokens.mjs
            │                (gagal build jika ada kontras di bawah WCAG AA)
            ├── tokens.css   ← GENERATED — jangan diedit manual
            └── (planned)    GTK theme, GNOME Shell theme
```

`tokens.json` dipilih sebagai source of truth karena dua alasan:

1. **Multi-target.** CSS tidak bisa menjadi input untuk GTK/GNOME theme; JSON bisa menjadi input untuk semuanya.
2. **AX.** Agent membaca JSON jauh lebih andal daripada CSS. Setiap token punya `$description` — palette ini self-documenting untuk manusia *dan* agent.

Tiga layer token:

| Layer | Prefix | Contoh | Peran |
|---|---|---|---|
| Raw | `--raw-*` | `--raw-patina` | Palette brand — nilai hex literal |
| Semantic | `--color-*` | `--color-accent-primary` | Peran, berubah per theme |
| Component | `--card-*`, `--btn-*`, dll | `--card-bg` | Resep komponen, mereferensi semantic |

Semantic token mereferensi raw via `var()` di mana ada raw yang cocok; shade netral di antaranya (mis. `#E8E3DB` untuk elevated light) adalah one-off yang sengaja hanya hidup di layer semantic.

---

## Prinsip Visual

**Warm-dark, bukan cold-dark.**
Base warna sedikit warm/brownish (`--raw-ember` `#1C1C1B`), bukan pure black. Ini yang membuat metallic gray terasa lebih material, lebih *ada*.

**Monokromatik + oxidasi.**
Palette utama adalah skala abu — dari Linen hingga Soot. Warna adalah tanda proses fisik, bukan dekorasi.

**Tiga suara tipografi.**
Setiap typeface punya peran yang berbeda dan tidak saling tumpang tindih.

**Terbaca adalah jujur.**
Sistem yang mengaku *honest* tidak boleh punya teks yang tidak terbaca. Semua peran teks lolos WCAG AA — dan build akan gagal jika ada yang turun di bawahnya.

---

## Color Tokens

### Skala Abu (warm gray)

| Token | Hex | Penggunaan |
|---|---|---|
| `--raw-linen` | `#F5F1EB` | Base bg (light) |
| `--raw-cloud-dancer` | `#EDE8E0` | Primary text (dark), surface (light) |
| `--raw-pale-alloy` | `#C8C4BE` | Secondary text (dark) |
| `--raw-iron-mist` | `#8A8680` | Tertiary text (dark), disabled (light) |
| `--raw-graphite` | `#4A4A48` | Disabled text (dark) |
| `--raw-ash` | `#3A3A38` | Ghost text, strong border (dark) |
| `--raw-forge` | `#252523` | Border, overlay (dark) |
| `--raw-coal` | `#1E1E1C` | Elevated surface, subtle border (dark) |
| `--raw-ember` | `#1C1C1B` | Base bg (dark) |
| `--raw-void` | `#161615` | Surface — cards, sidebar (dark) |
| `--raw-soot` | `#111110` | Sunken — statusbar (dark) |

### Aksen — Oxidized Metal

| Token | Hex | Penggunaan |
|---|---|---|
| `--raw-patina` | `#8C6A3A` | Accent primary — border, large UI |
| `--raw-patina-bright` | `#C0905A` | Patina **sebagai teks** di dark bg |
| `--raw-verdigris` | `#5A7A6A` | Accent secondary — border, large UI |
| `--raw-verdigris-bright` | `#85AE99` | Verdigris **sebagai teks** di dark bg |
| `--raw-copper` | `#BE8E50` | Status live (dark) |
| `--raw-amber` | `#CFA268` | Status warning (dark) |
| `--raw-rust` | `#D4663F` | Status error (dark) |

**Mengapa copper?**
Nama `ir0nm0nk` mengandung *iron* — besi yang bersentuhan dengan udara dan waktu menghasilkan karat (rust), lalu copper-tone, lalu verdigris. Semua warna aksen punya "alasan fisik" untuk ada.

**Aturan dua-tone aksen:** `--raw-patina`/`--raw-verdigris` (3.4–3.6:1 di dark bg) hanya untuk border dan elemen besar; untuk teks selalu pakai varian `-bright` (≥6:1). Semantic token `--color-accent-*-text` sudah menangani ini otomatis.

### Dark Mode vs Light Mode

| Token semantic | Dark | Light |
|---|---|---|
| `--color-bg-base` | `#1C1C1B` ember | `#F5F1EB` linen |
| `--color-bg-surface` | `#161615` void | `#EDE8E0` cloud dancer |
| `--color-text-primary` | `#EDE8E0` cloud dancer | `#1C1C1B` ember |
| `--color-text-secondary` | `#C8C4BE` pale alloy | `#2E2E2C` |
| `--color-text-tertiary` | `#8A8680` iron mist | `#5A5A58` |
| `--color-border-default` | `#252523` forge | `#D4CFC8` |
| `--color-accent-primary` | `#8C6A3A` *(sama)* | `#8C6A3A` *(sama)* |
| `--color-accent-primary-text` | `#C0905A` patina bright | `#7A5228` |
| `--color-status-error` | `#D4663F` rust | `#A32D2D` |

Aksen dasar tidak berubah antar mode — oxidized copper tidak berubah karena cahaya. Varian *teks*-nya menyesuaikan agar selalu terbaca.

### Theming

```html
<html>                    <!-- ikuti preferensi OS (default warm-dark di OS dark) -->
<html data-theme="dark">  <!-- paksa dark -->
<html data-theme="light"> <!-- paksa light -->
```

Setiap theme men-set `color-scheme` sehingga scrollbar dan form control native ikut berubah.

---

## Typography

### Tiga Suara, Satu Sistem

**Display — Cormorant Garamond**
```
Peran    : Titles, hero text, editorial moments
Weight   : 300 (light), 400, 600
Style    : Italic sebagai ekspresi, bukan dekorasi
Karakter : Jiwa sistem — klassik, tenang, punya kedalaman
```

**Interface — Syne**
```
Peran    : Semua UI label, navigasi, body text, heading
Weight   : 400, 500, 700, 800
Style    : Geometric, sedikit quirky, sangat readable
Karakter : Struktur sistem — tegas, modern, purposeful
```

**Technical — DM Mono**
```
Peran    : Data, terminal output, kode, nilai metrik
Weight   : 300 (light), 400, 500
Style    : Monospace yang hangat, tidak terlalu dingin
Karakter : Kejujuran sistem — apa adanya, tidak disembunyikan
```

### Skala

Ukuran dalam **rem** agar preferensi font-size pengguna dihormati (px di bawah mengasumsikan root 16px). Ukuran minimum sistem adalah `--text-xs` = 11px — tidak ada teks di bawah itu. Spacing tetap px by design: ritme spasial tidak ikut membesar.

| Level | Font | Token | Weight | Penggunaan |
|---|---|---|---|---|
| Hero | Cormorant Garamond | `--text-4xl`+ (36px+) | 300 italic | Page titles utama |
| Section title | Syne | `--text-xl`–`--text-2xl` (18–22px) | 700 | Section headers |
| Body | Syne | `--text-md` (14px) | 400 | Deskripsi, konten |
| UI label | Syne | `--text-sm` (12px) | 500 | Navigation, labels |
| Data | DM Mono | `--text-base`–`--text-md` (13–14px) | 300–400 | Nilai metrik, kode |
| Caption | DM Mono | `--text-xs` (11px) | 400 | Metadata, timestamps |

Catatan penamaan: `--text-base` (13px) adalah base untuk *kode/UI padat*; body text memakai `--text-md` (14px).

### Loading Fonts

Di `<head>` (non-blocking, preferred):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Syne:wght@400;500;700;800&family=DM+Mono:wght@300;400;500&display=swap">
```

Untuk konteks CSS murni: `@import 'fonts.css';` (blocking — gunakan hanya jika `<link>` tidak memungkinkan). Roadmap: self-host (ketiganya OFL) agar tidak ada request keluar homelab.

---

## Motion — Kinetics

Sistem bernama *Kinetika* wajib punya bahasa gerak.

| Token | Nilai | Penggunaan |
|---|---|---|
| `--duration-fast` | 120ms | Hover, focus, state kecil |
| `--duration-base` | 200ms | Mayoritas transisi |
| `--duration-slow` | 320ms | Panel, modal, ganti theme |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default — mekanis, purposeful |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances — settle seperti logam mendingin |
| `--ease-in` | `cubic-bezier(0.7, 0, 0.84, 0)` | Exits |

`prefers-reduced-motion: reduce` men-nol-kan semua durasi secara otomatis — sudah ditangani di tokens.css.

---

## Elevation, Z-Index, Focus

- **Shadows** (`--shadow-sm/md/lg`) — warm-tinted, tidak pernah pure black; nilainya berbeda per theme.
- **Z-index** (`--z-base/sticky/dropdown/overlay/modal/toast`) — 0 / 100 / 200 / 300 / 400 / 500.
- **Focus ring** — `--focus-ring` (2px patina, offset 2px). Utility: `.k-focusable:focus-visible`.

---

## Borders

| Token | Nilai | Catatan |
|---|---|---|
| `--border-width-default` | `1px` | Default — render konsisten di semua display & GTK |
| `--border-width-hairline` | `0.5px` | Opt-in, hanya untuk hi-dpi (render 0 atau 1px di 1×) |
| `--border-width-strong` | `2px` | |

Komposit siap pakai: `--border-default`, `--border-subtle`, `--border-strong`, `--border-accent`.

---

## Komponen

### Badges

Pakai utility class `.k-badge-patina` / `.k-badge-verdigris` — warnanya mengikuti theme otomatis via semantic token.

### Cards

```
bg      : var(--card-bg)        — surface
border  : var(--card-border)
radius  : var(--card-radius)    — 6px

Active  : bg var(--card-active-bg) (theme-scoped: #1A1410 dark / #EAE0D4 light)
          border var(--card-active-border) · top accent var(--card-active-accent)
```

### Buttons

```
Primary   : bg var(--color-accent-primary) · text #EDE8E0 · Syne 500 · uppercase · tracking 0.1em
Secondary : transparent · text var(--color-text-secondary) · border var(--border-strong)
```

---

## Aksesibilitas

Kontras diverifikasi **di build** (`build-tokens.mjs`) untuk kedua theme, terhadap `bg-base` dan `bg-surface`:

- Semua peran teks (primary/secondary/tertiary, accent-text, semua status) — **≥ 4.5:1** (AA)
- Elemen besar/UI (accent dasar, status-online dot) — **≥ 3:1**
- `--color-text-disabled` dan `--color-text-ghost` sengaja di bawah AA — **dekoratif saja**, jangan untuk informasi yang harus dibaca

Audit hidup ada di [`preview.html`](./preview.html) — tabel kontras menghitung ulang dirinya setiap ganti theme.

---

## Preview

Buka [`design/preview.html`](./preview.html) di browser — seluruh palette, tipografi, komponen, motion, dan audit kontras dalam satu halaman, dengan toggle System/Dark/Light. Tidak perlu build step.

---

## Implementasi

- [x] Design tokens source of truth (`tokens.json`)
- [x] CSS custom properties (`tokens.css`, generated)
- [x] Live preview + contrast audit (`preview.html`)
- [x] Konsumen pertama: SecondBrain `finance_dashboard.html` (tokens.css di-inline; chart palette dibaca dari token via `getComputedStyle` — re-theme saat ganti mode)
- [ ] GTK theme untuk KinetikaOS (GNOME) — generate dari `tokens.json`
- [ ] GNOME Shell theme
- [ ] Kinetika HQ visual refresh
- [ ] Self-hosted fonts
- [ ] Wallpaper pack (metallic/cloud texture)
- [ ] Icon set (monochromatic/desaturated)
- [ ] Logo/wordmark guideline · voice & tone

---

## Changelog

### 2.1.0 (2026-06)
- **Perbaikan AA:** primary button di-invert — bg `patina-bright` + teks `ember` (5.99:1, sebelumnya 4.06:1); light mode: bg `patina-text-light` + teks `linen` (6.09:1). Token baru: `--btn-primary-bg` / `--btn-primary-text`
- **Perbaikan WCAG 1.4.11:** input border mendapat warna khusus `--input-border-color` (≥3:1 di base/surface/elevated; dark: iron-mist, light: `#807C76`). `--border-strong` kini decorative-only
- **Component layer pindah ke `tokens.json`:** type roles, border composites, focus ring, dan semua component tokens (sidebar, topbar, card, badge, btn, input, nav, section-label) tidak lagi hardcoded di `build-tokens.mjs` — source of truth utuh kembali
- **Gerbang kontras diperluas jadi matriks:** setiap text role × setiap background yang diizinkan + pasangan komponen (button, badge patina/verdigris, input border) — 78 checks. Pembatasan terdokumentasi: `text-tertiary` tidak diizinkan di `bg-overlay`/`bg-sunken`
- Utility class baru: `.k-btn-primary`

### 2.0.0 (2026-06)
- `tokens.json` menjadi source of truth; `tokens.css` digenerate oleh `build-tokens.mjs` dengan gerbang kontras WCAG
- Dark mode dibuat lolos AA: tertiary text → iron mist, error → rust `#D4663F`, aksen mendapat varian `-bright` untuk teks
- Light mode status colors dikoreksi (live/warning/online)
- Raw layer benar-benar di-wire (semantic mereferensi `var(--raw-*)`); raw baru: ember, coal, soot, ash, patina-bright, verdigris-bright, copper, amber, rust
- Font sizes → rem; minimum naik dari 9px ke 11px
- Token baru: motion (duration/ease + reduced-motion), shadows (warm-tinted, per theme), z-index, focus ring
- `color-scheme` per theme; tanpa `data-theme` ikut preferensi OS
- Border default 0.5px → 1px (hairline tetap tersedia sebagai opt-in)
- Fonts dipisah dari tokens.css (`fonts.css` / `<link>` preconnect)

### 1.0.0
- Draft awal: palette, tipografi, spacing, komponen
