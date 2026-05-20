import type { TemplateDefinition } from "./types";

export const DEFAULT_TEMPLATE_ID = "ehc-virtual-card";

export const templates: TemplateDefinition[] = [
  {
    id: DEFAULT_TEMPLATE_ID,
    name: "標準テンプレート",
    background: {
      width: 1920,
      height: 1080
    },
    overlay: {
      x: 20,
      y: 250,
      width: 600,
      height: 470,
      color: "#FFFFFFD1"
    },
    badges: {
      x: 55,
      y: 735,
      areaWidth: 650,
      width: 190,
      maxHeight: 120,
      gap: 8,
      maxCount: 4
    },
    fields: {
      department: {
        x: 60,
        y: 300,
        width: 520,
        fontSize: 30,
        minFontSize: 18,
        lineHeight: 1.25,
        maxLines: 2,
        fontWeight: "normal",
        fontFamily: '"Noto Sans JP", sans-serif',
        color: "#000000"
      },
      title: {
        x: 60,
        y: 350,
        width: 520,
        fontSize: 30,
        minFontSize: 18,
        lineHeight: 1.25,
        maxLines: 2,
        fontWeight: "normal",
        fontFamily: '"Noto Sans JP", sans-serif',
        color: "#000000"
      },
      name: {
        x: 50,
        y: 420,
        width: 540,
        fontSize: 100,
        minFontSize: 44,
        lineHeight: 1.08,
        maxLines: 2,
        fontWeight: "bold",
        fontFamily: '"Noto Sans JP", sans-serif',
        color: "#000000"
      },
      nameKana: {
        x: 60,
        y: 520,
        width: 520,
        fontSize: 50,
        minFontSize: 24,
        lineHeight: 1.15,
        maxLines: 2,
        fontWeight: "normal",
        fontFamily: '"Noto Sans JP", sans-serif',
        color: "#000000"
      },
      email: {
        x: 50,
        y: 630,
        width: 540,
        fontSize: 30,
        minFontSize: 18,
        lineHeight: 1.2,
        maxLines: 2,
        fontWeight: "normal",
        fontFamily: '"Noto Sans JP", sans-serif',
        color: "#000000"
      }
    }
  }
];

export function getTemplateById(id: string): TemplateDefinition {
  const template = templates.find((entry) => entry.id === id);

  if (!template) {
    throw new Error(`Unknown template: ${id}`);
  }

  return template;
}
