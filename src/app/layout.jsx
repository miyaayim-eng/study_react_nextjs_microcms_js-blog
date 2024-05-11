// 共通のCSS
import "@sass/foundation/_index.scss";

// 共通のパーツ
import { Svg } from "@/components/elements/Svg";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

// 共通のmetaタグ
export const metadata = {
  title: {
    default: "みやがめボックス",
    template: `%s | みやがめボックス`,
  },
  description:
    "主にWeb制作についての技術記事を掲載しているブログサイトです。HTML、CSS、JavaScript、React、Next.jsなど、フロントエンドに関わる技術を学んでいます。",
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
};

// 共通の見た目
export default function RootLayout({ children }) {
  return (
    <>
      <html lang="ja">
        <body>
          <Svg />
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </>
  );
}
