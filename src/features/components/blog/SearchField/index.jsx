"use client";

import { Suspense } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./index.module.scss";

// 検索フィールドのコンポーネントを定義します。
export default function SearchField() {
  // ユーザーが入力した値
  const [inputValue, setInputValue] = useState("");
  // ユーザーがIME入力中がどうかの状態
  const [composing, setComposing] = useState(false);

  // Next.jsのルーター機能を取得するフック
  const router = useRouter();

  // 現在のURLの検索パラメータから 'q' パラメータを取得します。
  // 例えば、?q=keyword の「keyword」の部分を取得します。なければ空文字とします。
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get("q") || "";

  // input要素への参照を作成します。これにより、input要素に直接アクセスできます。
  const inputRef = useRef(null);

  // IME入力が開始されたときと終了したときの処理を行う関数です。
  // 入力中であれあば true 、そうでなければ false になります。
  const handleComposition = (isComposing) => setComposing(isComposing);

  // キーボードのキーが押されたときのイベントハンドラです。
  const handleKeyDown = useCallback(
    (event) => {
      if (
        (event.code === "Enter" || event.code === "NumpadEnter") && // EnterキーまたはテンキーのEnterが押された場合
        !composing // IME入力中でない場合
      ) {
        const query = inputRef.current?.value.trim(); // 入力された値を取得し、前後の余計な空白を削除（トリミング）
        // queryが空でない場合のみページ遷移を実行
        if (query) {
          router.push(`/search?q=${query}`); // クエリを使用してページ遷移
        }
        // Escapeキーで入力をクリア
      } else if (event.code === "Escape") {
        clearInput();
      }
    },
    [composing, router]
  );

  // 初期クエリが変更された際に入力値を更新する副作用です。
  // これがないと検索実行後のページ遷移後にクリアボタンがデフォルトで表示されない。
  useEffect(() => {
    setInputValue(defaultQuery);
  }, [defaultQuery]);

  // 入力値が変更された際のイベントハンドラです。
  const handleChange = (event) => setInputValue(event.target.value);

  // 入力フィールドをクリアする関数です。
  const clearInput = () => {
    setInputValue(""); // 状態を空に設定
    if (inputRef.current) {
      inputRef.current.value = ""; // input要素の実際の値を空に設定
    }
  };

  // 入力フィールドに何か入力されていればクリアボタンを表示するためのクラスを動的に設定します。
  const buttonClass = `${styles.clear} ${inputValue ? styles.visible : ""}`;

  // 検索フィールドコンポーネントのレンダリング部分です。
  return (
    <Suspense>
      <label className={styles.search}>
        <svg className={styles.icon__search}>
          <use href="#svg-search" />
        </svg>
        <input
          type="search" // 検索入力用のフィールドを指定します。ブラウザが入力内容を検索と認識し、適切なキーボードを表示することがあります（特にモバイルデバイスにおいて）。
          name="q" // フォームデータとして送信される際のフィールド名を設定します。'q' は一般的に検索クエリを表す名前として使用されます。
          ref={inputRef} // このinput要素への参照をReactのrefオブジェクトに関連付けます。これにより他の部分のコードから直接この要素を操作できるようになります。
          className={styles.input} // スタイルシートのクラスを適用します。スタイリングはCSSモジュールで定義されています。
          placeholder="記事を検索..." // ユーザーが何を入力すべきかのヒントを表示するプレースホルダーテキストです。
          onKeyDown={handleKeyDown} // キーボードのキーが押されたときに実行されるイベントハンドラです。ここではEnterキーとEscapeキーの処理を行います。
          onCompositionStart={() => handleComposition(true)} // IME入力が開始されたときに実行されるイベントハンドラです。IME入力中の状態をtrueに設定します。
          onCompositionEnd={() => handleComposition(false)} // IME入力が終了したときに実行されるイベントハンドラです。IME入力中の状態をfalseに戻します。
          onChange={handleChange} // 入力値が変更されたときに実行されるイベントハンドラです。このイベントはユーザーがフィールドに文字を入力するたびに発生します。
          defaultValue={defaultQuery} // コンポーネントがマウントされたときに入力フィールドに設定されるデフォルト値です。URLのクエリパラメータから取得した値を使用します。
        />

        <button className={buttonClass} onClick={clearInput}>
          <svg className={styles.icon__clear}>
            <use href="#svg-x" />
          </svg>
        </button>
      </label>
    </Suspense>
  );
}
