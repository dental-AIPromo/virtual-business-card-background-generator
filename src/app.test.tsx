import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import App from "./App";

describe("App", () => {
  it("ブランド承認済みテンプレートを選んで背景生成できる導線を表示する", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: "バーチャル名刺作成ツール"
      })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("テンプレート")).toBeInTheDocument();
    expect(screen.getByLabelText("背景画像")).toBeInTheDocument();
    expect(screen.getByLabelText("部署名")).toBeInTheDocument();
    expect(screen.getByLabelText("役職名")).toBeInTheDocument();
    expect(screen.getByLabelText("名前")).toBeInTheDocument();
    expect(screen.getByLabelText("よみがな（ローマ字）")).toBeInTheDocument();
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByText("背景画像を選ぶとプレビューを表示します。")).toBeInTheDocument();
    expect(
      screen.getByText("Copyright © エンパワーヘルスケア株式会社 All Rights Reserved.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "PNG をダウンロード" })).toBeDisabled();
  });

  it("背景画像を選ぶとダウンロード可能になる", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByLabelText("背景画像");
    const file = new File(["dummy"], "background.jpg", { type: "image/jpeg" });

    await user.upload(input, file);

    await waitFor(() => {
      expect(
        screen
          .getAllByRole("button", { name: "PNG をダウンロード" })
          .some((button) => !button.hasAttribute("disabled"))
      ).toBe(true);
    });
  });
});
