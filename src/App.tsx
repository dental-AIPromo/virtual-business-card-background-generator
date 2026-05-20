import { useEffect, useId, useMemo, useRef, useState } from "react";

import { drawTemplate } from "./renderBackground";
import { DEFAULT_TEMPLATE_ID, getTemplateById, templates } from "./templates";
import type { BadgeImageSource, FormValues } from "./types";
import "./styles.css";

const initialValues: FormValues = {
  department: "",
  position: "",
  name: "",
  nameKana: "",
  email: ""
};

type TextFieldKey = "department" | "position" | "name" | "nameKana" | "email";

const fieldLabels: Record<TextFieldKey, string> = {
  department: "部署名",
  position: "役職名",
  name: "名前",
  nameKana: "よみがな（ローマ字）",
  email: "メールアドレス"
};

export default function App() {
  const [templateId, setTemplateId] = useState(DEFAULT_TEMPLATE_ID);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [status, setStatus] = useState("背景画像を選ぶとプレビューを表示します。");
  const [previewReady, setPreviewReady] = useState(false);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string | null>(null);
  const [badgeImages, setBadgeImages] = useState<BadgeImageSource[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderVersionRef = useRef(0);
  const backgroundObjectUrlRef = useRef<string | null>(null);
  const badgeObjectUrlsRef = useRef<string[]>([]);
  const previewId = useId();

  const template = useMemo(() => getTemplateById(templateId), [templateId]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    if (!backgroundImageUrl) {
      renderVersionRef.current += 1;
      setPreviewReady(false);
      setStatus("背景画像を選ぶとプレビューを表示します。");
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    let cancelled = false;
    renderVersionRef.current += 1;
    const renderVersion = renderVersionRef.current;
    setPreviewReady(false);
      setStatus("プレビューを更新中です。");

    void drawTemplate(
      canvas,
      backgroundImageUrl,
      badgeImages,
      values,
      template,
      () => renderVersion === renderVersionRef.current
    )
      .then(() => {
        if (!cancelled) {
          setPreviewReady(true);
          setStatus("プレビューを更新しました。");
        }
      })
      .catch(() => {
        if (!cancelled && renderVersion === renderVersionRef.current) {
          setPreviewReady(false);
          setStatus("プレビューの更新に失敗しました。");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [backgroundImageUrl, badgeImages, template, values]);

  useEffect(() => () => {
    if (backgroundObjectUrlRef.current) {
      URL.revokeObjectURL(backgroundObjectUrlRef.current);
    }

    badgeObjectUrlsRef.current.forEach((url) => {
      URL.revokeObjectURL(url);
    });
  }, []);

  function handleChange(key: TextFieldKey, nextValue: string) {
    setValues((current) => ({
      ...current,
      [key]: nextValue
    }));
  }

  function handleBackgroundImageChange(file: File | null) {
    if (backgroundObjectUrlRef.current) {
      URL.revokeObjectURL(backgroundObjectUrlRef.current);
      backgroundObjectUrlRef.current = null;
    }

    if (!file) {
      setBackgroundImageUrl(null);
      return;
    }

    const nextUrl = URL.createObjectURL(file);
    backgroundObjectUrlRef.current = nextUrl;
    setBackgroundImageUrl(nextUrl);
    setStatus("背景画像を読み込み中です。");
  }

  function handleBadgeImageChange(fileList: FileList | null) {
    badgeObjectUrlsRef.current.forEach((url) => {
      URL.revokeObjectURL(url);
    });

    const files = Array.from(fileList ?? []).slice(0, template.badges.maxCount);
    const nextBadgeImages = files.map((file, index) => {
      const imageSrc = URL.createObjectURL(file);

      return {
        id: `badge-${index}-${file.name}`,
        name: file.name,
        imageSrc
      };
    });

    badgeObjectUrlsRef.current = nextBadgeImages.map((badgeImage) => badgeImage.imageSrc);
    setBadgeImages(nextBadgeImages);
  }

  function handleDownload() {
    if (!previewReady) {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "virtual-business-card-background.png";
    link.click();
    setStatus("PNG をダウンロードしました。");
  }

  return (
    <main className="page">
      <section className="panel form-panel">
        <p className="eyebrow">GitHub Pages / Browser Only</p>
        <h1>バーチャル名刺作成ツール</h1>
        <p className="lead">
          背景画像へ文字列を重ねて、会議用の背景画像を作成できます。
          入力内容はブラウザ内だけで扱い、保存しません。
        </p>
        <p className="notice">
          背景画像ファイルはこのページに同梱していません。お手元の背景画像を選んで使ってください。
        </p>

        <div className="field">
          <label htmlFor="template">テンプレート</label>
          <select
            id="template"
            value={templateId}
            onChange={(event) => setTemplateId(event.target.value)}
          >
            {templates.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="backgroundImage">背景画像</label>
          <input
            id="backgroundImage"
            type="file"
            accept=".png,.jpg,.jpeg,image/png,image/jpeg"
            onChange={(event) => handleBackgroundImageChange(event.target.files?.[0] ?? null)}
          />
        </div>

        <fieldset className="field badge-fieldset">
          <legend>バッジ画像</legend>
          <p className="badge-help">ローカルのバッジ画像を最大4枚まで横並びで追加できます。</p>
          <label htmlFor="badgeImages">バッジ画像を選ぶ</label>
          <input
            id="badgeImages"
            type="file"
            accept=".png,.jpg,.jpeg,image/png,image/jpeg"
            multiple
            onChange={(event) => handleBadgeImageChange(event.target.files)}
          />
          <ul className="badge-list" aria-live="polite">
            {badgeImages.length === 0 ? (
              <li>選択中のバッジはありません。</li>
            ) : (
              badgeImages.map((badgeImage) => <li key={badgeImage.id}>{badgeImage.name}</li>)
            )}
          </ul>
        </fieldset>

        {(
          Object.keys(fieldLabels) as TextFieldKey[]
        ).map((key) => (
          <div className="field" key={key}>
            <label htmlFor={key}>{fieldLabels[key]}</label>
            <input
              id={key}
              type="text"
              value={values[key]}
              onChange={(event) => handleChange(key, event.target.value)}
            />
          </div>
        ))}

        <button
          type="button"
          className="download-button"
          onClick={handleDownload}
          disabled={!previewReady}
        >
          PNG をダウンロード
        </button>
        <p className="notice">
          役職名は標準レイアウトに合わせて、サイズ 30 / 横 60 / 縦 350 で配置します。
        </p>
        <p className="notice">
          長い文字列は自動で縮小し、必要に応じて 2 行表示または省略します。
        </p>
      </section>

      <section className="panel preview-panel" aria-labelledby={previewId}>
        <div className="preview-header">
          <h2 id={previewId}>プレビュー</h2>
          <p aria-live="polite">{status}</p>
        </div>
        <div className="preview-frame">
          <canvas
            ref={canvasRef}
            className="preview-canvas"
            aria-label="生成される背景画像のプレビュー"
          />
        </div>
      </section>

      <footer className="page-footer">
        Copyright © エンパワーヘルスケア株式会社 All Rights Reserved.
      </footer>
    </main>
  );
}
