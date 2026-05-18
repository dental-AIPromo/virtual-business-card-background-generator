import type { FieldLayout } from "./types";

type MeasureText = (text: string, fontSize: number) => number;

export type FittedLine = {
  text: string;
  fontSize: number;
};

function sliceWithEllipsis(text: string, fontSize: number, width: number, measure: MeasureText) {
  const ellipsis = "…";

  if (measure(text, fontSize) <= width) {
    return text;
  }

  let end = text.length;

  while (end > 0) {
    const candidate = `${text.slice(0, end)}${ellipsis}`;
    if (measure(candidate, fontSize) <= width) {
      return candidate;
    }
    end -= 1;
  }

  return ellipsis;
}

export function fitTextToField(
  text: string,
  field: FieldLayout,
  measure: MeasureText
): FittedLine[] {
  const normalized = text.trim();

  if (!normalized) {
    return [];
  }

  for (let fontSize = field.fontSize; fontSize >= field.minFontSize; fontSize -= 1) {
    if (measure(normalized, fontSize) <= field.width) {
      return [{ text: normalized, fontSize }];
    }
  }

  const fittedSize = field.minFontSize;

  if (field.maxLines <= 1) {
    return [
      {
        text: sliceWithEllipsis(normalized, fittedSize, field.width, measure),
        fontSize: fittedSize
      }
    ];
  }

  const lines: string[] = [];
  let current = "";

  for (const [index, char] of Array.from(normalized).entries()) {
    const next = `${current}${char}`;
    if (measure(next, fittedSize) <= field.width) {
      current = next;
      continue;
    }

    if (current) {
      lines.push(current);
      current = char;
    } else {
      lines.push(char);
      current = "";
    }

    if (lines.length === field.maxLines - 1) {
      const remaining = `${current}${normalized.slice(index + 1)}`;
      lines.push(sliceWithEllipsis(remaining, fittedSize, field.width, measure));
      return lines.map((line) => ({ text: line, fontSize: fittedSize }));
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.slice(0, field.maxLines).map((line) => ({
    text: line,
    fontSize: fittedSize
  }));
}
