import "@testing-library/jest-dom/vitest";

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: () => ({
    clearRect: () => undefined,
    drawImage: () => undefined,
    fillRect: () => undefined,
    fillText: () => undefined,
    getImageData: (_x: number, _y: number, width: number, height: number) => ({
      data: new Uint8ClampedArray(width * height * 4)
    }),
    measureText: (text: string) => ({ width: text.length * 10 }),
    set fillStyle(_value: string) {
    },
    set font(_value: string) {
    },
    set textBaseline(_value: CanvasTextBaseline) {
    }
  })
});

Object.defineProperty(HTMLCanvasElement.prototype, "toDataURL", {
  value: () => "data:image/png;base64,stub"
});

Object.defineProperty(document, "fonts", {
  value: {
    load: async () => [],
    ready: Promise.resolve()
  },
  configurable: true
});

class MockImage {
  decoding = "async";
  onload: null | (() => void) = null;
  onerror: null | (() => void) = null;
  width = 365;
  height = 254;
  naturalWidth = 365;
  naturalHeight = 254;
  private currentSrc = "";

  get src() {
    return this.currentSrc;
  }

  set src(value: string) {
    this.currentSrc = value;
    queueMicrotask(() => {
      this.onload?.();
    });
  }
}

Object.defineProperty(globalThis, "Image", {
  value: MockImage,
  configurable: true
});

Object.defineProperty(URL, "createObjectURL", {
  value: () => "blob:mock-background-image",
  configurable: true
});

Object.defineProperty(URL, "revokeObjectURL", {
  value: () => undefined,
  configurable: true
});
