import { describe, expect, it } from "vitest";

import { fitTextToField } from "./textLayout";
import type { FieldLayout } from "./types";

const field: FieldLayout = {
  x: 0,
  y: 0,
  width: 100,
  fontSize: 30,
  minFontSize: 20,
  lineHeight: 1.2,
  maxLines: 2,
  fontWeight: "normal",
  fontFamily: '"Noto Sans JP", sans-serif',
  color: "#000000"
};

describe("fitTextToField", () => {
  it("短い文字列はそのまま返す", () => {
    const result = fitTextToField("AI推進部", field, (text, fontSize) => text.length * fontSize);
    expect(result).toEqual([{ text: "AI推進部", fontSize: 20 }]);
  });

  it("長い文字列は複数行または省略記号付きに収める", () => {
    const result = fitTextToField(
      "とても長い部署名サンプルテキストです",
      field,
      (text, fontSize) => text.length * fontSize
    );

    expect(result.length).toBeLessThanOrEqual(2);
    expect(result.at(-1)?.text.length).toBeGreaterThan(0);
  });

  it("同じ文字が続く場合でも残り文字列を重複なく扱う", () => {
    const result = fitTextToField(
      "AAAAABBBBBCCCCCDDDDDEEEEE",
      field,
      (text, fontSize) => text.length * fontSize
    );

    expect(result.length).toBe(2);
    expect(result[0]?.text).toBe("AAAAA");
    expect(result[1]?.text.startsWith("AAAAA")).toBe(false);
    expect(result[1]?.text.startsWith("BBBB")).toBe(true);
  });
});
