export type TemplateFieldKey =
  | "department"
  | "title"
  | "name"
  | "nameKana"
  | "email";

export type FormValues = {
  department: string;
  position: string;
  name: string;
  nameKana: string;
  email: string;
};

export type FieldLayout = {
  x: number;
  y: number;
  width: number;
  fontSize: number;
  minFontSize: number;
  lineHeight: number;
  maxLines: number;
  fontWeight: "normal" | "bold";
  fontFamily: string;
  color: string;
};

export type TemplateDefinition = {
  id: string;
  name: string;
  background: {
    width: number;
    height: number;
  };
  overlay: {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
  };
  badges: {
    x: number;
    y: number;
    areaWidth: number;
    width: number;
    gap: number;
    maxCount: number;
  };
  fields: {
    department: FieldLayout;
    title: FieldLayout;
    name: FieldLayout;
    nameKana: FieldLayout;
    email: FieldLayout;
  };
};

export type RenderLine = {
  label: TemplateFieldKey;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontWeight: "normal" | "bold";
  fontFamily: string;
  color: string;
};

export type RenderModel = {
  lines: RenderLine[];
};

export type BadgeImageSource = {
  id: string;
  name: string;
  imageSrc: string;
};
