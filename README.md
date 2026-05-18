# バーチャル名刺背景ジェネレーター

Copyright 2026 エンパワーヘルスケア株式会社

このリポジトリは `Apache License 2.0` で公開しています。
著作権者は エンパワーヘルスケア株式会社 です。詳細は [LICENSE](./LICENSE) と [NOTICE](./NOTICE) を参照してください。

バーチャル名刺背景をブラウザ上で作るツールです。  
利用者が選んだ背景画像に対して、部署名・役職名・名前・名前（よみがな）・メールアドレスを重ねて、PNG をダウンロードできます。

## できること

- 利用者が選んだ背景画像を使ってプレビュー表示
- ブラウザ内だけで文字を合成
- 入力内容を保存しない
- 長い文字列は自動縮小、必要に応じて 2 行化または省略
- プレビュー成功時のみ PNG ダウンロード可能

## 使い方

1. テンプレートを選びます
2. 背景画像ファイルを選びます
3. 必要な文字を入力します
4. 右側のプレビューを確認します
5. `PNG をダウンロード` を押します

## 入力項目

- 部署名
- 役職名
- 名前
- 名前（よみがな）
- メールアドレス

## 動作方針

- 背景画像は利用者が任意に選択できます
- 画像生成はサーバーを使わず、Canvas でブラウザ内完結します
- 入力内容や背景画像は保存しません
- リポジトリや公開サイトに背景画像は同梱しません

## 開発

```bash
npm install
npm run dev
```

## 主なコマンド

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm run verify
```

- フレームワーク: React + TypeScript + Vite
- テスト: Vitest + Testing Library
- 背景描画: HTML Canvas
- フォント: `Noto Sans JP` を Google Fonts から読込し、描画前に `document.fonts.load()` / `document.fonts.ready` を待機

`npm run verify` は `test / typecheck / lint / build` を順に実行します。

## ライセンス

- ライセンス: `Apache-2.0`
- 著作権者: エンパワーヘルスケア株式会社
