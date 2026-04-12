# Design System — ir0nm0nk

> *Iron that rusts. Copper that oxidizes. Honest by material.*

Identitas visual Kinetika. Dinamai dari edge compute node `ir0nm0nk` yang menginspirasinya — sebuah sistem yang bekerja tanpa henti, meninggalkan bekas dari setiap penggunaan.

---

## Prinsip Visual

**Warm-dark, bukan cold-dark.**
Base warna sedikit warm/brownish (`#1C1C1B`), bukan pure black. Ini yang membuat metallic gray terasa lebih material, lebih *ada*.

**Monokromatik + oxidasi.**
Palette utama adalah skala abu — dari Cloud Dancer hingga Void. Warna adalah tanda proses fisik, bukan dekorasi.

**Tiga suara tipografi.**
Setiap typeface punya peran yang berbeda dan tidak saling tumpang tindih.

---

## Color Tokens

### Skala Utama

| Token | Hex | Nama | Penggunaan |
|---|---|---|---|
| `--cloud-dancer` | `#EDE8E0` | Cloud Dancer | Primary text (dark mode), base bg (light mode) |
| `--pale-alloy` | `#C8C4BE` | Pale Alloy | Secondary text, UI elements |
| `--iron-mist` | `#8A8680` | Iron Mist | Tertiary text, disabled states |
| `--graphite` | `#4A4A48` | Graphite | Subtle text, timestamps |
| `--forge` | `#252523` | Forge | Border, dividers |
| `--void` | `#161615` | Void | Deep background, sidebar |
| `--linen` | `#F5F1EB` | Linen | Light mode base background |

### Aksen — Oxidized Copper

| Token | Hex | Nama | Penggunaan |
|---|---|---|---|
| `--patina` | `#8C6A3A` | Patina | Accent primary — active states, highlights, CTA |
| `--verdigris` | `#5A7A6A` | Verdigris | Accent secondary — synced, linked, passive states |

**Mengapa copper?**
Nama `ir0nm0nk` mengandung *iron* — besi yang bersentuhan dengan udara dan waktu menghasilkan karat, lalu copper-tone, lalu verdigris. Semua warna aksen punya "alasan fisik" untuk ada.

### Dark Mode vs Light Mode

| Elemen | Dark Mode | Light Mode |
|---|---|---|
| Background | `#1C1C1B` | `#F5F1EB` (Linen) |
| Surface | `#161615` | `#EDE8E0` (Cloud Dancer) |
| Primary text | `#EDE8E0` | `#1C1C1B` |
| Secondary text | `#6A6A67` | `#5A5A58` |
| Border | `#252523` | `#D4CFC8` |
| Accent (Patina) | `#8C6A3A` | `#8C6A3A` *(sama)* |
| Accent (Verdigris) | `#5A7A6A` | `#5A7A6A` *(sama)* |

Aksen tidak berubah antar mode — oxidized copper tidak berubah karena cahaya.

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

### Hierarki Tipografi

| Level | Font | Size | Weight | Penggunaan |
|---|---|---|---|---|
| Hero | Cormorant Garamond | 36px+ | 300 italic | Page titles utama |
| Section title | Syne | 18–22px | 700 | Section headers |
| UI label | Syne | 10–12px | 500 | Navigation, labels |
| Body | Syne | 14px | 400 | Deskripsi, konten |
| Caption | DM Mono | 9–10px | 400 | Metadata, timestamps |
| Data | DM Mono | 11–14px | 400 | Nilai metrik, kode |

---

## Komponen

### Badges

```
Patina (dark)  : bg #2A1C10 · text #8C6A3A · border #5A3A22
Patina (light) : bg #F0E8DC · text #7A5228 · border #C8A878
Verdigris (dark)  : bg #101A18 · text #5A7A6A · border #2A4A42
Verdigris (light) : bg #DFF0EA · text #3A6A5A · border #8ABCAC
```

### Cards

```
Dark  : bg #161615 · border 0.5px #252523 · radius 6px
Light : bg #EDE8E0 · border 0.5px #D4CFC8 · radius 6px

Active card (dark)  : bg #1A1410 · border #5A3A22 · top accent 1px #8C6A3A
Active card (light) : bg #EAE0D4 · border #A87848 · top accent 1px #8C6A3A
```

### Buttons

```
Primary : bg #8C6A3A · text #EDE8E0 · font Syne 500 · uppercase · tracking 0.1em
Secondary (dark)  : transparent · text #6A6A67 · border #3A3A38
Secondary (light) : transparent · text #5A5A58 · border #C8C3BC
```

---

## Implementasi

Design system ini akan diimplementasikan sebagai:

- [ ] CSS custom properties file (`tokens.css`)
- [ ] GTK theme untuk KinetikaOS (GNOME)
- [ ] GNOME Shell theme
- [ ] Kinetika HQ visual refresh
- [ ] Wallpaper pack (metallic/cloud texture)
- [ ] Icon set (monochromatic/desaturated)

---

## Import Fonts (Web)

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Syne:wght@400;500;700;800&family=DM+Mono:wght@300;400;500&display=swap');
```