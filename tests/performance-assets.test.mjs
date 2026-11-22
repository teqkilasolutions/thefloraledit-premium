import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';

const file = name => new URL(`../${name}`, import.meta.url);

test('the displayed identity is lightweight while the original master stays intact', () => {
  assert.equal(createHash('sha256').update(readFileSync(file('public/assets/brand/the-floral-edit-master-logo.jpg'))).digest('hex'), 'c32e29173190097a0839d86e9ae437961f440aa3440997f58f9fc32ed56c2791');
  assert.ok(statSync(file('public/assets/brand/floral-monogram.webp')).size < 18000, 'The header logo must be under 18 KB');
});

test('the opening photograph and fonts meet cold-load budgets', () => {
  assert.ok(statSync(file('public/assets/optimized/day-lounge-800.avif')).size < 100000, 'Phone opening photograph must be under 100 KB');
  assert.ok(statSync(file('public/assets/optimized/day-room-1600.avif')).size < 200000, 'Desktop opening photograph must be under 200 KB');
  for (const font of ['allura-400', 'lora-400', 'lora-500', 'manrope-400', 'manrope-500', 'manrope-600']) {
    assert.ok(statSync(file(`public/assets/fonts/${font}-latin.woff2`)).size < 40000, `${font} must be under 40 KB`);
  }
});
