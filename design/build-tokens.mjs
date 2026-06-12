#!/usr/bin/env node
/**
 * KINETIKA DESIGN SYSTEM — token build
 *
 * tokens.json (source of truth) → tokens.css (generated, do not edit by hand)
 *
 * Usage: node design/build-tokens.mjs
 *
 * Verifies WCAG contrast for every text-role/background pair it permits,
 * plus component pairs (button, badge, input border, focus ring), in both
 * themes — and fails the build if any pair drops below its target ratio.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(readFileSync(join(here, 'tokens.json'), 'utf8'));

/* ---------- helpers ---------- */

// Alias path → CSS custom property name.
//   {color.raw.patina}          → --raw-patina
//   {color.semantic.bg-surface} → --color-bg-surface   (theme-scoped)
//   {color.component.x}         → --x                  (theme-scoped, bare)
//   {anything.else}             → --anything-else      ({font.display}, {space.3}, {border.subtle}, …)
const varName = (path) => {
  const p = path.split('.');
  if (p[0] === 'color') {
    if (p[1] === 'raw') return `--raw-${p[2]}`;
    if (p[1] === 'component') return `--${p[2]}`;
    return `--color-${p.slice(p[1] === 'semantic' ? 2 : 1).join('-')}`;
  }
  return `--${p.join('-')}`;
};

// Replace every {alias} in a value with var(--…). Non-alias text passes through.
const toCss = (v) =>
  String(v).replace(/\{([a-zA-Z0-9.-]+)\}/g, (_, path) => `var(${varName(path)})`);

// "{color.raw.patina}" → "#8C6A3A" (for contrast math). Literals pass through.
const toHex = (v) => {
  const m = /^\{color\.raw\.([a-z0-9-]+)\}$/.exec(v);
  return m ? tokens.color.raw[m[1]].$value : v;
};

const entries = (group) =>
  Object.entries(group).filter(([k]) => !k.startsWith('$'));

// aligned "  --name : value;" lines, with optional trailing comment
const props = (group, prefix, { comments = false } = {}) => {
  const rows = entries(group).map(([k, t]) => [`--${prefix}${k}`, toCss(t.$value), t.$description]);
  const w = Math.max(...rows.map(([n]) => n.length));
  return rows
    .map(([n, v, d]) => `  ${n.padEnd(w)} : ${v};${comments && d ? ` /* ${d} */` : ''}`)
    .join('\n');
};

// nested group ({ roleOrComponent: { prop: token } }) → blocks of aligned props
const nestedProps = (group, prefix) =>
  entries(group)
    .map(([name, sub]) => {
      const label = sub.$description ? `  /* ${name} — ${sub.$description} */` : `  /* ${name} */`;
      return `${label}\n${props(sub, `${prefix}${name}-`)}`;
    })
    .join('\n\n');

const banner = (title) => `
/* ============================================================
   ${title}
   ============================================================ */
`;

/* ---------- theme blocks ---------- */

const themeBody = (mode) => `  color-scheme: ${mode};

  /* Backgrounds */
${props(pick(tokens.color[mode], 'bg-'), 'color-')}

  /* Text */
${props(pick(tokens.color[mode], 'text-'), 'color-')}

  /* Borders */
${props(pick(tokens.color[mode], 'border-'), 'color-')}

  /* Accent — Patina (primary) */
${props(pick(tokens.color[mode], 'accent-primary'), 'color-')}

  /* Accent — Verdigris (secondary) */
${props(pick(tokens.color[mode], 'accent-secondary'), 'color-')}

  /* Status */
${props(pick(tokens.color[mode], 'status-'), 'color-')}

  /* Shadows — warm-tinted, never pure black */
${props(tokens.shadow[mode], 'shadow-')}

  /* Theme-scoped component values */
${props(tokens.color.component[mode], '')}`;

function pick(group, prefix) {
  return Object.fromEntries(entries(group).filter(([k]) => k.startsWith(prefix)));
}

/* ---------- static tail (non-token CSS: media query + utility classes) ---------- */

const STATIC_TAIL = `
${banner('MOTION — reduced motion')}
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0ms;
    --duration-base: 0ms;
    --duration-slow: 0ms;
  }
}

${banner('UTILITY CLASSES (optional, opt-in)')}
.k-label {
  font-family   : var(--section-label-font);
  font-size     : var(--section-label-size);
  letter-spacing: var(--section-label-tracking);
  text-transform: var(--section-label-transform);
  color         : var(--section-label-color);
}

.k-display {
  font-family  : var(--type-display-font);
  font-size    : var(--type-display-size);
  font-weight  : var(--type-display-weight);
  font-style   : var(--type-display-style);
  line-height  : var(--type-display-leading);
  color        : var(--color-text-primary);
}

.k-data {
  font-family : var(--type-data-font);
  font-size   : var(--type-data-size);
  font-weight : var(--type-data-weight);
  color       : var(--color-text-secondary);
}

.k-mono {
  font-family: var(--font-technical);
  font-size  : var(--type-code-size);
  line-height: var(--type-code-leading);
}

.k-btn-primary {
  background    : var(--btn-primary-bg);
  color         : var(--btn-primary-text);
  border        : none;
  font-family   : var(--btn-font);
  font-size     : var(--btn-size);
  font-weight   : var(--btn-weight);
  letter-spacing: var(--btn-tracking);
  padding       : var(--btn-padding);
  border-radius : var(--btn-radius);
  text-transform: uppercase;
}

.k-badge-patina {
  background    : var(--color-accent-primary-bg);
  color         : var(--color-accent-primary-text);
  border        : var(--border-width-default) solid var(--color-accent-primary-border);
  font-family   : var(--badge-font);
  font-size     : var(--badge-size);
  padding       : var(--badge-padding);
  border-radius : var(--badge-radius);
  letter-spacing: var(--badge-tracking);
  text-transform: uppercase;
}

.k-badge-verdigris {
  background    : var(--color-accent-secondary-bg);
  color         : var(--color-accent-secondary-text);
  border        : var(--border-width-default) solid var(--color-accent-secondary-border);
  font-family   : var(--badge-font);
  font-size     : var(--badge-size);
  padding       : var(--badge-padding);
  border-radius : var(--badge-radius);
  letter-spacing: var(--badge-tracking);
  text-transform: uppercase;
}

.k-focusable:focus-visible {
  outline       : var(--focus-ring);
  outline-offset: var(--focus-ring-offset);
}
`;

/* ---------- assemble ---------- */

const fontFamilies = Object.fromEntries(
  entries(tokens.font).map(([k, t]) => [k, {
    $value: t.$value.map((f) => (f.includes(' ') ? `'${f}'` : f)).join(', '),
  }]),
);

const css = `/**
 * KINETIKA DESIGN SYSTEM
 * tokens.css — Design Tokens v${tokens.$version}
 *
 * ir0nm0nk visual identity
 * Built by hand. Honest by default.
 *
 * GENERATED FILE — do not edit. Source of truth: tokens.json
 * Rebuild with: node design/build-tokens.mjs
 *
 * Fonts are no longer imported here (a CSS @import blocks rendering).
 * Load them via <link> with preconnect, or @import 'fonts.css' — see fonts.css.
 *
 * Usage:
 *   @import 'tokens.css';
 *   background: var(--color-bg-base);
 *   color: var(--color-text-primary);
 *   font-family: var(--font-display);
 *
 * Theming:
 *   Default is warm-dark. Without a data-theme attribute the OS
 *   preference is respected; set <html data-theme="dark|light"> to force.
 */

${banner('FONTS')}
:root {
  /* Three voices, one system */
${props(fontFamilies, 'font-')}

  /* Aliases */
  --font-serif : var(--font-display);
  --font-sans  : var(--font-interface);
  --font-mono  : var(--font-technical);
}

${banner('COLOR PALETTE — RAW TOKENS')}
:root {
${props(tokens.color.raw, 'raw-', { comments: true })}
}

${banner('SEMANTIC TOKENS — DARK MODE (default)')}
:root,
[data-theme="dark"] {
${themeBody('dark')}
}

${banner('SEMANTIC TOKENS — LIGHT MODE')}
[data-theme="light"] {
${themeBody('light')}
}

/* No-JS / no-attribute fallback: follow the OS preference */
@media (prefers-color-scheme: light) {
  :root:not([data-theme]) {
${themeBody('light')}
  }
}

${banner('TYPOGRAPHY SCALE')}
:root {
  /* Font sizes — rem so user font-size preferences are respected */
${props(tokens.text, 'text-', { comments: true })}

  /* Font weights */
${props(tokens.weight, 'weight-')}

  /* Line heights */
${props(tokens.leading, 'leading-')}

  /* Letter spacing */
${props(tokens.tracking, 'tracking-')}
}

${banner('SPACING')}
:root {
${props(tokens.space, 'space-')}
}

${banner('BORDER RADIUS')}
:root {
${props(tokens.radius, 'radius-', { comments: true })}
}

${banner('BORDER WIDTHS')}
:root {
${props(tokens['border-width'], 'border-width-', { comments: true })}
}

${banner('MOTION')}
:root {
  /* Durations */
${props(tokens.duration, 'duration-', { comments: true })}

  /* Easings */
${props(tokens.ease, 'ease-', { comments: true })}
}

${banner('Z-INDEX')}
:root {
${props(tokens.z, 'z-')}
}

${banner('TYPOGRAPHY ROLES')}
:root {
${nestedProps(tokens['type-role'], 'type-')}
}

${banner('BORDERS')}
:root {
${props(tokens.border, 'border-')}
}

${banner('FOCUS')}
:root {
${props(tokens.focus, 'focus-')}
}

${banner('COMPONENT TOKENS')}
:root {
${nestedProps(tokens.component, '')}
}
${STATIC_TAIL}`;

/* ---------- contrast verification ---------- */

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/*
 * Matrix: every foreground is checked against every background it is
 * PERMITTED on. A background absent from a row is a documented usage
 * restriction, not an oversight:
 *   - text-tertiary is not permitted on bg-overlay/bg-sunken (fails AA there)
 *   - text-disabled / text-ghost are decorative by design — never checked
 * 4.5 = AA body text · 3.0 = AA large text / non-text UI (WCAG 1.4.11)
 */
const SURFACES = ['bg-base', 'bg-surface', 'bg-elevated', 'bg-sunken', 'bg-overlay'];
const CORE = ['bg-base', 'bg-surface', 'bg-elevated'];

// [foreground(semantic), backgrounds(semantic), target]
const TEXT_CHECKS = [
  ['text-primary', SURFACES, 4.5],
  ['text-secondary', SURFACES, 4.5],
  ['text-tertiary', CORE, 4.5],
  ['accent-primary-text', CORE, 4.5],
  ['accent-secondary-text', CORE, 4.5],
  ['status-live', ['bg-base', 'bg-surface'], 4.5],
  ['status-warning', ['bg-base', 'bg-surface'], 4.5],
  ['status-error', ['bg-base', 'bg-surface'], 4.5],
  ['status-online', ['bg-base', 'bg-surface'], 3.0],
  ['accent-primary', ['bg-base', 'bg-surface'], 3.0],   // also covers focus ring (1.4.11)
  ['accent-secondary', ['bg-base', 'bg-surface'], 3.0],
];

// [foreground, background, target] — both looked up in color[mode] OR color.component[mode]
const PAIR_CHECKS = [
  ['btn-primary-text', 'btn-primary-bg', 4.5],          // primary button label
  ['accent-primary-text', 'accent-primary-bg', 4.5],    // patina badge
  ['accent-secondary-text', 'accent-secondary-bg', 4.5],// verdigris badge
];

// non-text component boundaries vs the surfaces they sit on (1.4.11, ≥3:1)
const BOUNDARY_CHECKS = [
  ['input-border-color', CORE, 3.0],
];

let failed = false;
const report = (mode, fgName, bgName, fg, bg, target) => {
  const r = ratio(fg, bg);
  const ok = r >= target;
  if (!ok) failed = true;
  console.log(
    `${ok ? ' ok ' : 'FAIL'}  ${mode.padEnd(5)} ${fgName.padEnd(22)} on ${bgName.padEnd(22)} ${r.toFixed(2)}:1 (target ${target}:1)`,
  );
};

for (const mode of ['dark', 'light']) {
  const theme = tokens.color[mode];
  const comp = tokens.color.component[mode];
  const resolve = (name) => toHex((theme[name] ?? comp[name]).$value);

  for (const [fgName, bgs, target] of TEXT_CHECKS) {
    for (const bgName of bgs) report(mode, fgName, bgName, resolve(fgName), resolve(bgName), target);
  }
  for (const [fgName, bgName, target] of PAIR_CHECKS) {
    report(mode, fgName, bgName, resolve(fgName), resolve(bgName), target);
  }
  for (const [fgName, bgs, target] of BOUNDARY_CHECKS) {
    for (const bgName of bgs) report(mode, fgName, bgName, resolve(fgName), resolve(bgName), target);
  }
}

if (failed) {
  console.error('\nContrast check failed — tokens.css not written.');
  process.exit(1);
}

writeFileSync(join(here, 'tokens.css'), css);
console.log(`\ntokens.css written (v${tokens.$version}) — all contrast checks passed.`);
