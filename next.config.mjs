/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
  // URL末尾にスラッシュが無い場合、スラッシュ有りのURLへリダイレクト
  trailingSlash: true,
};

export default nextConfig;
