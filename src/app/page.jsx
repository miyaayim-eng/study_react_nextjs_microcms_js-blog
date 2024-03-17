import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <h1>トップページです</h1>
      <p>
        <Link href="/blog">ブログページへのリンク</Link>
      </p>
    </main>
  );
}
