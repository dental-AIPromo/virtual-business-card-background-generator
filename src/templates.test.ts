import { describe, expect, it } from "vitest";

import { DEFAULT_TEMPLATE_ID, getTemplateById, templates } from "./templates";

describe("templates", () => {
  it("初期テンプレートとして標準テンプレートを持つ", () => {
    expect(templates).toHaveLength(1);
    expect(DEFAULT_TEMPLATE_ID).toBe("ehc-virtual-card");

    const template = getTemplateById(DEFAULT_TEMPLATE_ID);

    expect(template).toMatchObject({
      id: "ehc-virtual-card",
      name: "標準テンプレート",
      background: {
        width: 1920,
        height: 1080
      },
      overlay: {
        x: 20,
        y: 250,
        width: 600,
        height: 470
      },
      badges: {
        x: 0,
        y: 735,
        width: 320,
        maxHeight: 230,
        maxCount: 4
      }
    });
    expect(template.fields.department.fontSize).toBe(30);
    expect(template.fields.title.fontSize).toBe(30);
    expect(template.fields.title.y).toBe(350);
    expect(template.fields.name.fontSize).toBe(100);
    expect(template.fields.nameKana.fontSize).toBe(50);
    expect(template.fields.email.x).toBe(50);
    expect(template.fields.email.y).toBe(630);
  });
});
