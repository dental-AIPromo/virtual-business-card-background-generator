import { describe, expect, it } from "vitest";

import { detectCropBounds } from "./badgeCrop";

function createImageData(width: number, height: number, fill: [number, number, number, number]) {
  const data = new Uint8ClampedArray(width * height * 4);

  for (let index = 0; index < width * height; index += 1) {
    data[index * 4] = fill[0];
    data[index * 4 + 1] = fill[1];
    data[index * 4 + 2] = fill[2];
    data[index * 4 + 3] = fill[3];
  }

  return data;
}

function paintRect(
  data: Uint8ClampedArray,
  width: number,
  x: number,
  y: number,
  rectWidth: number,
  rectHeight: number,
  color: [number, number, number, number]
) {
  for (let row = y; row < y + rectHeight; row += 1) {
    for (let col = x; col < x + rectWidth; col += 1) {
      const offset = (row * width + col) * 4;
      data[offset] = color[0];
      data[offset + 1] = color[1];
      data[offset + 2] = color[2];
      data[offset + 3] = color[3];
    }
  }
}

describe("detectCropBounds", () => {
  it("白背景の外周余白を除いた範囲を返す", () => {
    const data = createImageData(8, 6, [255, 255, 255, 255]);
    paintRect(data, 8, 2, 1, 4, 3, [20, 20, 80, 255]);

    expect(detectCropBounds(data, 8, 6)).toEqual({
      x: 2,
      y: 1,
      width: 4,
      height: 3
    });
  });

  it("透過背景でも中身の範囲を返す", () => {
    const data = createImageData(7, 5, [255, 255, 255, 0]);
    paintRect(data, 7, 1, 2, 3, 2, [10, 10, 10, 255]);

    expect(detectCropBounds(data, 7, 5)).toEqual({
      x: 1,
      y: 2,
      width: 3,
      height: 2
    });
  });
});
