import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';

const moduleUrl = new URL('../src/lib/inspiration.ts', import.meta.url);
const known = Array.from({ length: 12 }, (_, i) => `photo-${i + 1}`);
async function helpers() {
  assert.ok(existsSync(moduleUrl), 'Saved inspiration storage has not been implemented');
  return import(moduleUrl.href);
}

test('corrupt and non-array saves recover to an empty edit', async () => {
  const { readInspiration } = await helpers();
  for (const raw of [null, '', '{broken', '{}', 'null', '"photo-1"', '12']) assert.deepEqual(readInspiration(raw, known), []);
});

test('only known unique image IDs survive in the original selection order', async () => {
  const { readInspiration } = await helpers();
  assert.deepEqual(readInspiration(JSON.stringify(['photo-3', 'retired', null, {}, 'photo-1', 'photo-3', 7]), known), ['photo-3', 'photo-1']);
});

test('an edit contains no more than eight images', async () => {
  const { readInspiration, INSPIRATION_LIMIT } = await helpers();
  assert.equal(INSPIRATION_LIMIT, 8);
  assert.deepEqual(readInspiration(JSON.stringify(known), known), known.slice(0, 8));
});

test('a full edit still permits removal, then accepts a replacement', async () => {
  const { toggleInspiration } = await helpers();
  const full = known.slice(0, 8);
  assert.deepEqual(toggleInspiration(full, 'photo-9', known), full);
  const removed = toggleInspiration(full, 'photo-3', known);
  assert.equal(removed.length, 7);
  assert.equal(removed.includes('photo-3'), false);
  assert.deepEqual(toggleInspiration(removed, 'photo-9', known), [...removed, 'photo-9']);
});

test('an unknown image cannot be added or persisted', async () => {
  const { toggleInspiration } = await helpers();
  assert.deepEqual(toggleInspiration(['photo-1', 'photo-1', 'retired'], '<script>bad</script>', known), ['photo-1']);
});
