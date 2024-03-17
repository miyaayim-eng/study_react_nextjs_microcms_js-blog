// import React from "react";

// 共通のCSS
import "src/scss/foundation/_index.scss";

// 共通のパーツ
import { Header } from "src/components/layouts/Header/Header";
import { Footer } from "src/components/layouts/Footer/Footer";

// 共通のmetaタグ
export const metadata = {
  title: {
    default: "サイトタイトル",
    template: `%s | サイトタイトル`,
  },
  description: "Next.jsで作成練習です。",
  // openGraph: {
  //   title: {
  //     default: "サイトタイトル",
  //     template: `%s | サイトタイトル`,
  //   },
  //   description: "",
  // },
  // twitter: {
  //   card: "summary_large_image",
  // },
  // title: "Next.jsで作成練習",
  // description: "Next.jsで作成練習です。",
};

// 共通の見た目
export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
