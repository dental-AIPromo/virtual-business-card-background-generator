# バーチャル名刺作成ツール

Copyright 2026 エンパワーヘルスケア株式会社

このリポジトリは `Apache License 2.0` で公開しています。
著作権者は エンパワーヘルスケア株式会社 です。詳細は [LICENSE](./LICENSE) と [NOTICE](./NOTICE) を参照してください。
このリポジトリは公開ページ配信用です。  
GitHub Pages は Actions deploy で配信します。`main` と `dev` の `docs/` を組み立てて、それぞれ `/` と `/dev/` に公開します。

バーチャル名刺画像をブラウザ上で作るツールです。  
利用者が選んだ背景画像に対して、部署名・役職名・名前・よみがな（ローマ字）・メールアドレスを重ねて、PNG をダウンロードできます。
必要に応じて、手元のバッジ画像を1〜4枚まで横並びで追加できます。

公開ページ: [https://dental-aipromo.github.io/virtual-business-card-background-generator/](https://dental-aipromo.github.io/virtual-business-card-background-generator/)
開発確認ページ: [https://dental-aipromo.github.io/virtual-business-card-background-generator/dev/](https://dental-aipromo.github.io/virtual-business-card-background-generator/dev/)

## 使い方

1. 公開ページを開きます
2. テンプレートを選びます
3. 背景画像ファイルを選びます
4. 必要ならバッジ画像を1〜4枚選びます
5. 必要な文字を入力します
6. 右側のプレビューを確認します
7. `PNG をダウンロード` を押します

## 何ができるか

- 利用者が選んだ背景画像を使ってプレビュー表示
- ローカルのバッジ画像を1〜4枚まで横並びで追加
- ブラウザ内だけで文字を合成
- 入力内容を保存しない
- 長い文字列は自動縮小、必要に応じて 2 行化または省略
- プレビュー成功時のみ PNG ダウンロード可能

## 入力項目

- 部署名
- 役職名
- 名前
- よみがな（ローマ字）
- メールアドレス
- バッジ画像（任意、最大4枚）

## 動作

- 背景画像は利用者が任意に選択します
- 背景画像は利用者が各自で用意します
- バッジ画像も利用者が各自で用意します
- 画像生成はブラウザ内で完結します
- 入力内容、背景画像、バッジ画像は保存しません
- 入力内容、背景画像、バッジ画像はサーバーへ送信しません
- フォント読込のため Google Fonts への通信があります

## 開発者向け

- 現時点でこのリポジトリに確認できる配布物は `docs/` 配下の静的ファイルです
- `package.json`、`src/`、依存ロックファイル、ビルド手順は確認できません
- Pages の公開は `.github/workflows/deploy-pages.yml` で行います
- `docs/assets/index-BsyVD1d0.js` には React の MIT ライセンス表示が含まれるため、第三者ライセンス案内は `docs/THIRD_PARTY_NOTICES.txt` を参照してください

## ライセンス

- ライセンス: `Apache-2.0`
- 著作権者: エンパワーヘルスケア株式会社
