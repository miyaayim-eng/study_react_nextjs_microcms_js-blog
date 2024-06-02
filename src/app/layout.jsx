import { generateBlogInfo } from "@/libs/generateBlogInfo";
const blogInfo = await generateBlogInfo();

// ローカルフォント読み込み
import localFont from "next/font/local";
const zen_maru_gothic = localFont({
  src: [
    {
      path: "../../src/public/assets/fonts/Zen_Maru_Gothic/ZenMaruGothic-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../src/public/assets/fonts/Zen_Maru_Gothic/ZenMaruGothic-Bold.ttf",
      weight: "700",
    },
  ],
  display: "swap",
  variable: " --ff-zen_maru",
});
const quicksand = localFont({
  src: "../../src/public/assets/fonts/Quicksand/Quicksand-VariableFont_wght.ttf",
  display: "swap",
  variable: " --ff-en",
});

// 共通のCSS
import "@sass/foundation/_index.scss";

import {
  SITE_NAME,
  PAGE_SEPARATOR,
  BASE_URL,
  OGP,
  TWITTER,
  HOME_DESCRIPTION,
} from "@/constants/metadata";
const description = HOME_DESCRIPTION;

import { Svg } from "@/components/elements/Svg";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

// 共通のmetaタグ
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_NAME,
    template: `%s${PAGE_SEPARATOR}${SITE_NAME}`,
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: {
      default: SITE_NAME,
      template: `%s${PAGE_SEPARATOR}${SITE_NAME}`,
    },
    description,
    url: BASE_URL,
    siteName: SITE_NAME,
    locale: OGP.LOCALE,
    type: "website",
    images: OGP.IMAGE,
  },
  twitter: {
    card: TWITTER.CARD,
    images: TWITTER.IMAGE,
  },
};

// 共通の見た目
export default function RootLayout({ children }) {
  return (
    <>
      <html
        lang="ja"
        className={`${zen_maru_gothic.variable} ${quicksand.variable}`}
      >
        <body>
          <Svg />
          <Header blogInfo={blogInfo} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </>
  );
}
