export type CropBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const COLOR_THRESHOLD = 24;
const ALPHA_THRESHOLD = 16;

function isContentPixel(
  data: Uint8ClampedArray,
  offset: number,
  background: [number, number, number, number]
): boolean {
  const alpha = data[offset + 3];

  if (alpha <= ALPHA_THRESHOLD && background[3] <= ALPHA_THRESHOLD) {
    return false;
  }

  const colorDelta =
    Math.abs(data[offset] - background[0]) +
    Math.abs(data[offset + 1] - background[1]) +
    Math.abs(data[offset + 2] - background[2]);
  const alphaDelta = Math.abs(alpha - background[3]);

  return colorDelta > COLOR_THRESHOLD || alphaDelta > ALPHA_THRESHOLD;
}

export function detectCropBounds(
  data: Uint8ClampedArray,
  width: number,
  height: number
): CropBounds {
  const background: [number, number, number, number] = [
    data[0],
    data[1],
    data[2],
    data[3]
  ];

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;

      if (!isContentPixel(data, offset, background)) {
        continue;
      }

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  if (maxX < minX || maxY < minY) {
    return {
      x: 0,
      y: 0,
      width,
      height
    };
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1
  };
}
