import type { FormValues, RenderLine, RenderModel, TemplateDefinition } from "./types";

function maybeLine(
  label: RenderLine["label"],
  text: string,
  field: TemplateDefinition["fields"][keyof TemplateDefinition["fields"]]
): RenderLine | null {
  const normalized = text.trim();

  if (!normalized) {
    return null;
  }

  return {
    label,
    text: normalized,
    x: field.x,
    y: field.y,
    fontSize: field.fontSize,
    fontWeight: field.fontWeight,
    fontFamily: field.fontFamily,
    color: field.color
  };
}

export function buildRenderModel(
  values: FormValues,
  template: TemplateDefinition
): RenderModel {
  const lines = [
    maybeLine("department", values.department, template.fields.department),
    maybeLine("title", values.position, template.fields.title),
    maybeLine("name", values.name, template.fields.name),
    maybeLine("nameKana", values.nameKana, template.fields.nameKana),
    maybeLine("email", values.email, template.fields.email)
  ].filter((line): line is RenderLine => line !== null);

  return { lines };
}
