// Development-only: SHARP_MODULE can point to an existing installation of sharp.
// The source photographs and master logo are never overwritten.
const sharp = require(process.env.SHARP_MODULE || 'sharp');
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const assets = path.join(root, 'public/assets');
const widths = [480, 800, 1200, 1600];
const heroIds = new Set(['day-room', 'day-lounge', 'night-room', 'night-arrangement', 'heritage-room', 'heritage-lounge', 'day-wide', 'day-arch']);

(async () => {
  const out = path.join(assets, 'optimized');
  await fs.mkdir(out, { recursive: true });
  const records = [];
  const photos = (await fs.readdir(path.join(assets, 'portfolio'))).filter(name => name.endsWith('.webp') && !name.endsWith('-small.webp'));
  // Sequential encoding keeps peak memory bounded on development computers.
  for (const photo of process.argv.includes('--logo-only') ? [] : photos) {
    const id = photo.replace('.webp', '');
    const input = path.join(assets, 'portfolio', photo);
    for (const width of widths) {
      for (const format of heroIds.has(id) ? ['webp', 'avif'] : ['webp']) {
        const name = `${id}-${width}.${format}`;
        const image = sharp(input).resize({ width, withoutEnlargement: true });
        const info = await (format === 'avif' ? image.avif({ quality: 50, effort: 5 }) : image.webp({ quality: 74, effort: 5 })).toFile(path.join(out, name));
        records.push({ name, width: info.width, height: info.height, bytes: info.size });
      }
    }
    process.stdout.write(`${id} prepared\n`);
  }

  // Bake the approved SVG colour matrix once instead of filtering a 3.6 MB
  // CMYK image on every page. Crop and colour exactly match FloralIdentity.
  const source = await fs.readFile(path.join(assets, 'brand/the-floral-edit-master-logo.jpg'));
  const { data, info } = await sharp(source).toColourspace('srgb').extract({ left: 805, top: 735, width: 1970, height: 1710 }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    rgba[i * 4] = 83; rgba[i * 4 + 1] = 99; rgba[i * 4 + 2] = 54;
    rgba[i * 4 + 3] = Math.round(Math.max(0, Math.min(255, .34016 * data[i * 3] + 1.14432 * data[i * 3 + 1] + .11552 * data[i * 3 + 2] - .6 * 255)));
  }
  const resized = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).resize({ width: 320 }).raw().toBuffer({ resolveWithObject: true });
  // Discard sub-percent JPEG/rounding noise in the alpha channel. Letterforms
  // and the botanical linework are retained; RGB stays the exact brand olive.
  for (let i = 0; i < resized.data.length; i += 4) {
    resized.data[i] = 83; resized.data[i + 1] = 99; resized.data[i + 2] = 54;
    resized.data[i + 3] = Math.min(255, Math.round(resized.data[i + 3] / 4) * 4);
  }
  const logo = await sharp(resized.data, { raw: { width: resized.info.width, height: resized.info.height, channels: 4 } }).webp({ lossless: true, effort: 6 }).toFile(path.join(assets, 'brand/floral-monogram.webp'));
  const previous = process.argv.includes('--logo-only') ? JSON.parse(await fs.readFile(path.join(root, 'design-notes/performance-assets.json'), 'utf8')).photographs : records;
  await fs.writeFile(path.join(root, 'design-notes/performance-assets.json'), JSON.stringify({
    source: 'Existing approved portfolio WebP derivatives; original source files preserved.',
    widths, webpQuality: 74, avifQuality: 50,
    logo: { sourceSha256: crypto.createHash('sha256').update(source).digest('hex'), crop: [805, 735, 1970, 1710], width: logo.width, height: logo.height, bytes: logo.size },
    photographs: previous,
  }, null, 2) + '\n');
  console.log(`Logo: ${logo.size} bytes; ${records.length} responsive images prepared.`);
})();
