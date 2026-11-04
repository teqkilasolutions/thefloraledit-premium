import { readFileSync, writeFileSync } from 'node:fs';

// Keep Pages output stable across Windows and Unix builds, and serve it as static files.
const index = new URL('../docs/index.html', import.meta.url);
writeFileSync(index, readFileSync(index, 'utf8').replace(/\r/g, ''));
writeFileSync(new URL('../docs/.nojekyll', import.meta.url), '');
