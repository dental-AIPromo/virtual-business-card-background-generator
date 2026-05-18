import "@testing-library/jest-dom/vitest";

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: () => ({
    clearRect: () => undefined,
    drawImage: () => undefined,
    fillRect: () => undefined,
    fillText: () => undefined,
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
