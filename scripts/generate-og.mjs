/**
 * Generates the static Open Graph image and the favicon set.
 *
 * Run with `npm run og`. Output is committed to the repo — this does not run
 * during `astro build` or in CI, so the site never depends on it.
 *
 * satori lays out the design and emits SVG with the glyphs already converted to
 * paths, so sharp can rasterise it without needing the font installed on the
 * system. No network access, no external OG service.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');

const fontDir = join(root, 'node_modules/@fontsource/schibsted-grotesk/files');
const [regular, semibold] = await Promise.all([
  readFile(join(fontDir, 'schibsted-grotesk-latin-400-normal.woff')),
  readFile(join(fontDir, 'schibsted-grotesk-latin-600-normal.woff')),
]);

const FONT = 'Schibsted Grotesk';
const fonts = [
  { name: FONT, data: regular, weight: 400, style: 'normal' },
  { name: FONT, data: semibold, weight: 600, style: 'normal' },
];

// Tokens from src/styles/global.css. The site is black for everyone, so the
// OG image and the icons are black too — there is no second palette to pick.
const PAPER = '#000000';
const INK = '#ffffff';
const MUTED = '#ababab';
const RULE = '#383838';

/** satori accepts plain objects in place of JSX elements. */
const h = (type, style, children) => ({ type, props: { style, children } });

/* -------------------------------------------------------------------------- */
/* Open Graph — 1200x630                                                      */
/* -------------------------------------------------------------------------- */

// The entry grid, carried over from the site: a hairline, then a date in the
// left column against the content in the right, exactly as the pages are built.
const ogRow = (date, children, extra = {}) =>
  h(
    'div',
    {
      display: 'flex',
      width: '100%',
      borderTop: `1px solid ${RULE}`,
      paddingTop: '20px',
      ...extra,
    },
    [
      h(
        'div',
        {
          display: 'flex',
          width: '200px',
          color: MUTED,
          fontSize: '22px',
          flexShrink: 0,
        },
        date,
      ),
      h(
        'div',
        { display: 'flex', flexDirection: 'column', flex: 1 },
        children,
      ),
    ],
  );

const ogTree = h(
  'div',
  {
    display: 'flex',
    flexDirection: 'column',
    width: '1200px',
    height: '630px',
    backgroundColor: PAPER,
    fontFamily: FONT,
    padding: '64px 72px',
  },
  [
    // The masthead, with no rule above it: name, then title, then one-liner.
    ogRow(
      '',
      [
        h(
          'div',
          {
            display: 'flex',
            color: INK,
            fontSize: '56px',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
          },
          'Pranav Gillella,',
        ),
        h(
          'div',
          {
            display: 'flex',
            color: MUTED,
            fontSize: '56px',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          },
          'Founder, Quant Labs LLC',
        ),
        h(
          'div',
          {
            display: 'flex',
            color: INK,
            fontSize: '27px',
            lineHeight: 1.4,
            letterSpacing: '-0.005em',
            marginTop: '26px',
            maxWidth: '760px',
          },
          'Business + CS at UIUC. Founder of Quant Labs LLC. Working toward quant trading and research.',
        ),
        h('div', { display: 'flex', height: '34px' }),
      ],
      { borderTop: 'none', paddingTop: '0px' },
    ),
    ogRow('Aug 2026', [
      h(
        'div',
        { display: 'flex', color: INK, fontSize: '24px', lineHeight: 1.5 },
        'Freshman at UIUC — Gies Business, CS minor in Grainger',
      ),
      h('div', { display: 'flex', height: '12px' }),
    ]),
    ogRow('Jun 2026', [
      h(
        'div',
        { display: 'flex', color: INK, fontSize: '24px', lineHeight: 1.5 },
        'Quant Labs LLC — EarlyDMV and Protestly',
      ),
      h('div', { display: 'flex', height: '12px' }),
    ]),
    ogRow('Mar 2026', [
      h(
        'div',
        { display: 'flex', color: INK, fontSize: '24px', lineHeight: 1.5 },
        'Backtesting engine, factor models, paper trading',
      ),
    ]),
    // Spacer row keeps the rail running to the footer.
    ogRow('', [h('div', { display: 'flex' }, '')], { flex: 1 }),
    ogRow('', [
      h(
        'div',
        { display: 'flex', color: MUTED, fontSize: '23px' },
        'pranavg237.github.io',
      ),
    ]),
  ],
);

const ogSvg = await satori(ogTree, { width: 1200, height: 630, fonts });
await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toFile(join(pub, 'og.png'));
console.log('wrote public/og.png (1200x630)');

/* -------------------------------------------------------------------------- */
/* Favicon — the name rule over a P                                           */
/* -------------------------------------------------------------------------- */

const markTree = h(
  'div',
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '512px',
    height: '512px',
    backgroundColor: PAPER,
    fontFamily: FONT,
  },
  [
    h(
      'div',
      {
        display: 'flex',
        color: INK,
        fontSize: '300px',
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing: '-0.03em',
      },
      'P',
    ),
    h('div', {
      display: 'flex',
      width: '150px',
      height: '26px',
      backgroundColor: INK,
      marginTop: '18px',
    }),
  ],
);

const markSvg = await satori(markTree, { width: 512, height: 512, fonts });
const markPng = await sharp(Buffer.from(markSvg)).png().toBuffer();

await mkdir(pub, { recursive: true });

// apple-touch-icon wants no transparency and 180x180.
await sharp(markPng).resize(180, 180).png().toFile(join(pub, 'apple-touch-icon.png'));
console.log('wrote public/apple-touch-icon.png (180x180)');

for (const size of [192, 512]) {
  await sharp(markPng)
    .resize(size, size)
    .png()
    .toFile(join(pub, `icon-${size}.png`));
  console.log(`wrote public/icon-${size}.png`);
}

/**
 * An .ico is a 6-byte header, one 16-byte directory entry per image, then the
 * image payloads. Modern .ico files may hold PNG data directly, which is what
 * this does — one 32x32 entry.
 */
const ico32 = await sharp(markPng).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type 1 = icon
header.writeUInt16LE(1, 4); // one image
const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0); // width
entry.writeUInt8(32, 1); // height
entry.writeUInt8(0, 2); // palette size (0 = no palette)
entry.writeUInt8(0, 3); // reserved
entry.writeUInt16LE(1, 4); // colour planes
entry.writeUInt16LE(32, 6); // bits per pixel
entry.writeUInt32LE(ico32.length, 8);
entry.writeUInt32LE(header.length + entry.length, 12); // offset to payload
await writeFile(join(pub, 'favicon.ico'), Buffer.concat([header, entry, ico32]));
console.log('wrote public/favicon.ico (32x32)');

/**
 * The SVG favicon is drawn by hand rather than exported from satori: satori's
 * output carries the whole glyph outline, and a hand-drawn P is a fraction of
 * the bytes at the size a favicon is actually displayed.
 */
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="${PAPER}"/>
  <path d="M10.3 7h6.3c3.1 0 5.1 1.9 5.1 4.8s-2 4.8-5.1 4.8h-2.9V21h-3.4V7Zm3.4 2.8v4h2.6c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-2.6Z" fill="${INK}"/>
  <rect x="11.5" y="23.4" width="9" height="2.6" fill="${INK}"/>
</svg>
`;
await writeFile(join(pub, 'favicon.svg'), faviconSvg);
console.log('wrote public/favicon.svg');

const manifest = {
  name: 'Pranav Gillella',
  short_name: 'Pranav Gillella',
  start_url: '/',
  display: 'minimal-ui',
  background_color: PAPER,
  theme_color: PAPER,
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
  ],
};
await writeFile(join(pub, 'site.webmanifest'), JSON.stringify(manifest, null, 2) + '\n');
console.log('wrote public/site.webmanifest');
