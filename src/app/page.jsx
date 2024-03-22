import Link from "next/link";

export default async function Page() {
  return (
    <main>
      <h1>トップページです</h1>
      <p>
        <Link href="/blog">ブログページへのリンク</Link>
      </p>
    </main>
  );
}
