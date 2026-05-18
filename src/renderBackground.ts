import { buildRenderModel } from "./renderModel";
import { fitTextToField } from "./textLayout";
import type { FormValues, TemplateDefinition } from "./types";

const imageCache = new Map<string, HTMLImageElement>();

async function loadImage(src: string): Promise<HTMLImageElement> {
  const cached = imageCache.get(src);
  if (cached) {
    return cached;
  }

  const image = new Image();
  image.decoding = "async";

  const loaded = await new Promise<HTMLImageElement>((resolve, reject) => {
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    image.src = src;
  });

  imageCache.set(src, loaded);
  return loaded;
}

async function ensureFontReady(template: TemplateDefinition): Promise<void> {
  if (typeof document === "undefined" || !("fonts" in document)) {
    return;
  }

  const families = new Set(
    Object.values(template.fields).map((field) => ({
      family: field.fontFamily,
      fontSize: field.fontSize,
      fontWeight: field.fontWeight
    }))
  );

  await Promise.all(
    Array.from(families).map(({ family, fontSize, fontWeight }) =>
      document.fonts.load(`${fontWeight} ${fontSize}px ${family}`)
    )
  );
  await document.fonts.ready;
}

export async function drawTemplate(
  canvas: HTMLCanvasElement,
  backgroundImageSrc: string,
  values: FormValues,
  template: TemplateDefinition,
  isCurrent: () => boolean = () => true
): Promise<void> {
  const scratchCanvas = document.createElement("canvas");
  const ctx = scratchCanvas.getContext("2d");

  if (!ctx) {
    throw new Error("2D canvas context is not available");
  }

  scratchCanvas.width = template.background.width;
  scratchCanvas.height = template.background.height;

  await ensureFontReady(template);
  const image = await loadImage(backgroundImageSrc);
  ctx.clearRect(0, 0, scratchCanvas.width, scratchCanvas.height);
  ctx.drawImage(image, 0, 0, scratchCanvas.width, scratchCanvas.height);

  ctx.fillStyle = template.overlay.color;
  ctx.fillRect(
    template.overlay.x,
    template.overlay.y,
    template.overlay.width,
    template.overlay.height
  );

  const model = buildRenderModel(values, template);

  for (const line of model.lines) {
    const field = template.fields[line.label];
    const fittedLines = fitTextToField(
      line.text,
      field,
      (text, fontSize) => {
        ctx.font = `${line.fontWeight} ${fontSize}px ${line.fontFamily}`;
        return ctx.measureText(text).width;
      }
    );

    fittedLines.forEach((fittedLine, index) => {
      ctx.fillStyle = line.color;
      ctx.font = `${line.fontWeight} ${fittedLine.fontSize}px ${line.fontFamily}`;
      ctx.textBaseline = "top";
      ctx.fillText(
        fittedLine.text,
        line.x,
        line.y + index * fittedLine.fontSize * field.lineHeight
      );
    });
  }

  if (!isCurrent()) {
    throw new Error("A newer preview render is already in progress");
  }

  const targetContext = canvas.getContext("2d");

  if (!targetContext) {
    throw new Error("2D canvas context is not available");
  }

  canvas.width = template.background.width;
  canvas.height = template.background.height;
  targetContext.clearRect(0, 0, canvas.width, canvas.height);
  targetContext.drawImage(scratchCanvas, 0, 0);
}
