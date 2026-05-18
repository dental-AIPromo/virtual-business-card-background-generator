import { describe, expect, it } from "vitest";

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
});
