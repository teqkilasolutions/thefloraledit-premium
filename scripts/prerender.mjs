import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../dist-ssr/entry-server.js';

const destination = process.argv[2] || 'dist';
if (!['dist', 'docs'].includes(destination)) throw new Error('Expected the dist or docs build directory');
const index = new URL(`../${destination}/index.html`, import.meta.url);
const html = await readFile(index, 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('The build has no empty app root to prerender');
// Critical image hints already live in the head, including art direction.
const markup = render().replace(/<link rel="preload"[^>]*\/>/g, '');
await writeFile(index, html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`));
console.log(`Prerendered ${destination}/index.html with the complete homepage.`);
