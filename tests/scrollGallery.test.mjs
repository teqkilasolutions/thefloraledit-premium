import test from 'node:test';
import assert from 'node:assert/strict';
import { scrollGalleryFrame, scrollGalleryTransform } from '../src/lib/scrollGallery.ts';

test('the centre image grows from an inset portrait to the complete viewport', () => {
  for (const [width, height] of [[390, 844], [1440, 1000]]) {
    const start = scrollGalleryFrame(0, width, height);
    const middle = scrollGalleryFrame(.5, width, height);
    const end = scrollGalleryFrame(1, width, height);
    assert.ok(start.width < width * .55 && start.height < height);
    assert.ok(middle.width > start.width && middle.width < end.width);
    assert.equal(end.width, width);
    assert.equal(end.height, height);
    assert.equal(end.x, 0);
    assert.equal(end.y, 0);
    assert.equal(end.radius, 0);
  }
});

test('compositor transforms preserve photograph proportions and cover the expanding frame', () => {
  for (const [width, height] of [[390, 844], [1440, 1000]]) {
    for (const progress of [0, .25, .5, .75, 1]) {
      const frame = scrollGalleryFrame(progress, width, height);
      const value = scrollGalleryTransform(progress, width, height, 1825, 2738);
      const x = value.scaleX * value.imageScaleX;
      const y = value.scaleY * value.imageScaleY;
      assert.ok(Math.abs(x - y) < .00001, 'A flower must scale uniformly, without stretching');
      assert.ok(value.imageWidth * x >= frame.width - .01);
      assert.ok(value.imageHeight * y >= frame.height - .01);
    }
  }
});

test('overscroll is clamped and scroll reversal returns the same frame', () => {
  assert.deepEqual(scrollGalleryFrame(-10, 390, 844), scrollGalleryFrame(0, 390, 844));
  assert.deepEqual(scrollGalleryFrame(10, 1440, 1000), scrollGalleryFrame(1, 1440, 1000));
  const forward = scrollGalleryFrame(.35, 390, 844);
  scrollGalleryFrame(.8, 390, 844);
  assert.deepEqual(scrollGalleryFrame(.35, 390, 844), forward);
});
