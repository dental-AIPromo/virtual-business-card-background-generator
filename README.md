# バーチャル名刺作成ツール

Copyright 2026 エンパワーヘルスケア株式会社

このリポジトリは公開ページ配信用です。  
公開ページ: [https://dental-aipromo.github.io/virtual-business-card-background-generator/](https://dental-aipromo.github.io/virtual-business-card-background-generator/)  
GitHub Pages は Actions deploy で配信します。`main` と `dev` の `docs/` を組み立てて、それぞれ `/` と `/dev/` に公開します。

## できること

- 背景画像を選んでプレビュー表示
- バッジ画像を最大4枚まで追加
- ブラウザ内だけで文字を合成
- PNG をダウンロード

## 使い方

1. 公開ページを開きます
2. 背景画像を選びます
3. 必要ならバッジ画像を選びます
4. 文字を入力します
5. PNG をダウンロードします

## 動作

- 背景画像とバッジ画像は利用者が各自で用意します
- 入力内容、背景画像、バッジ画像は保存しません
- 入力内容、背景画像、バッジ画像はサーバーへ送信しません

## 配布物について

- 現時点でこのリポジトリに確認できる配布物は `docs/` 配下の静的ファイルです
- `package.json`、`src/`、依存ロックファイル、ビルド手順は確認できません
- Pages の公開は `.github/workflows/deploy-pages.yml` で行います
- `docs/assets/index-BsyVD1d0.js` には React の MIT ライセンス表示が含まれるため、第三者ライセンス案内は `docs/THIRD_PARTY_NOTICES.txt` を参照してください

## ライセンス

- ライセンス: `GPL-3.0-only`
- 著作権者: エンパワーヘルスケア株式会社
