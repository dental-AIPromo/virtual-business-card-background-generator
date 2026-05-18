# バーチャル名刺背景ジェネレーター

Copyright 2026 エンパワーヘルスケア株式会社

このリポジトリは `Apache License 2.0` で公開しています。
著作権者は エンパワーヘルスケア株式会社 です。詳細は [LICENSE](./LICENSE) と [NOTICE](./NOTICE) を参照してください。

バーチャル名刺背景をブラウザ上で作るツールです。  
利用者が選んだ背景画像に対して、部署名・役職名・名前・名前（よみがな）・メールアドレスを重ねて、PNG をダウンロードできます。

公開ページ: [https://dental-aipromo.github.io/virtual-business-card-background-generator/](https://dental-aipromo.github.io/virtual-business-card-background-generator/)

## 使い方

1. 公開ページを開きます
2. テンプレートを選びます
3. 背景画像ファイルを選びます
4. 必要な文字を入力します
5. 右側のプレビューを確認します
6. `PNG をダウンロード` を押します

## 何ができるか

- 利用者が選んだ背景画像を使ってプレビュー表示
- ブラウザ内だけで文字を合成
- 入力内容を保存しない
- 長い文字列は自動縮小、必要に応じて 2 行化または省略
- プレビュー成功時のみ PNG ダウンロード可能

## 入力項目

- 部署名
- 役職名
- 名前
- 名前（よみがな）
- メールアドレス

## 動作

- 背景画像は利用者が任意に選択します
- 背景画像は利用者が各自で用意します
- 画像生成はブラウザ内で完結します
- 入力内容や背景画像は保存しません
- 入力内容や背景画像はサーバーへ送信しません
- フォント読込のため Google Fonts への通信があります

## 開発者向け

ローカルで起動する場合:

```bash
npm install
npm run dev
```

検証コマンド:

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
- フォント: `Noto Sans JP`（Google Fonts）

`npm run verify` は `test / typecheck / lint / build` を順に実行します。

## ライセンス

- ライセンス: `Apache-2.0`
- 著作権者: エンパワーヘルスケア株式会社
