import { describe, expect, it, vi } from "vitest";

import { drawTemplate } from "./renderBackground";
import { getTemplateById } from "./templates";

describe("drawTemplate", () => {
  it("2D context が取得できない場合は失敗として扱う", async () => {
    const canvas = document.createElement("canvas");
    canvas.getContext = () => null;

    await expect(
      drawTemplate(
        canvas,
        "blob:background-image",
        [],
        {
          department: "AI推進部",
          position: "部長",
          name: "テスト太郎",
          nameKana: "てすとたろう",
          email: "sample@example.com"
        },
        getTemplateById("ehc-virtual-card")
      )
    ).rejects.toThrow("2D canvas context is not available");
  });

  it("より新しい描画がある場合は古い描画を反映しない", async () => {
    const canvas = document.createElement("canvas");

    await expect(
      drawTemplate(
        canvas,
        "blob:background-image",
        [],
        {
          department: "AI推進部",
          position: "部長",
          name: "テスト太郎",
          nameKana: "てすとたろう",
          email: "sample@example.com"
        },
        getTemplateById("ehc-virtual-card"),
        () => false
      )
    ).rejects.toThrow("A newer preview render is already in progress");
  });

  it("選択したバッジを最大4個まで横並びで描画する", async () => {
    const canvas = document.createElement("canvas");
    const scratchCanvas = document.createElement("canvas");
    const scratchDrawImage = vi.fn();
    const scratchContext = {
      clearRect: vi.fn(),
      drawImage: scratchDrawImage,
      fillRect: vi.fn(),
      fillText: vi.fn(),
      measureText: vi.fn((text: string) => ({ width: text.length * 10 })),
      set fillStyle(_value: string) {
      },
      set font(_value: string) {
      },
      set textBaseline(_value: CanvasTextBaseline) {
      }
    };
    scratchCanvas.getContext = ((contextId: string) =>
      contextId === "2d"
        ? (scratchContext as unknown as CanvasRenderingContext2D)
        : null) as typeof scratchCanvas.getContext;

    const previewContext = {
      clearRect: vi.fn(),
      drawImage: vi.fn()
    };
    canvas.getContext = ((contextId: string) =>
      contextId === "2d"
        ? (previewContext as unknown as CanvasRenderingContext2D)
        : null) as typeof canvas.getContext;

    const originalCreateElement = document.createElement.bind(document);
    const createElementSpy = vi
      .spyOn(document, "createElement")
      .mockImplementation((tagName: string) => {
        if (tagName === "canvas") {
          return scratchCanvas;
        }

        return originalCreateElement(tagName) as HTMLElement;
      });

    try {
      await drawTemplate(
        canvas,
        "blob:background-image",
        [
          { id: "badge-1", name: "badge-1.png", imageSrc: "blob:badge-1" },
          { id: "badge-2", name: "badge-2.png", imageSrc: "blob:badge-2" },
          { id: "badge-3", name: "badge-3.png", imageSrc: "blob:badge-3" },
          { id: "badge-4", name: "badge-4.png", imageSrc: "blob:badge-4" },
          { id: "badge-5", name: "badge-5.png", imageSrc: "blob:badge-5" }
        ],
        {
          department: "AI推進部",
          position: "部長",
          name: "テスト太郎",
          nameKana: "てすとたろう",
          email: "sample@example.com"
        },
        getTemplateById("ehc-virtual-card")
      );
    } finally {
      createElementSpy.mockRestore();
    }

    expect(scratchDrawImage).toHaveBeenCalledTimes(5);
    const badgeCalls = scratchDrawImage.mock.calls.slice(1, 5);
    expect(badgeCalls).toHaveLength(4);
    expect(badgeCalls[0][1]).toBe(20);
    expect(badgeCalls[0][1]).toBeLessThan(badgeCalls[1][1]);
    expect(badgeCalls[1][1]).toBeLessThan(badgeCalls[2][1]);
    expect(badgeCalls[2][1]).toBeLessThan(badgeCalls[3][1]);
    expect(badgeCalls.every((call) => call[2] === 735)).toBe(true);
    expect(previewContext.drawImage).toHaveBeenCalledTimes(1);
  });
});
