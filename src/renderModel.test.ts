import { describe, expect, it } from "vitest";

import { buildRenderModel } from "./renderModel";
import { getTemplateById } from "./templates";

describe("buildRenderModel", () => {
  it("任意項目が空でも崩れず、保存しない前提の描画モデルを返す", () => {
    const model = buildRenderModel(
      {
        department: "AI推進部",
        position: "",
        name: "",
        nameKana: "",
        email: "sample@example.com"
      },
      getTemplateById("ehc-virtual-card")
    );

    expect(model.lines.map((line) => line.label)).toEqual([
      "department",
      "email"
    ]);
    expect(model.lines[0]).toMatchObject({
      text: "AI推進部",
      x: 60,
      y: 300
    });
    expect(model.lines[1]).toMatchObject({
      text: "sample@example.com",
      x: 50,
      y: 630
    });
  });
});
