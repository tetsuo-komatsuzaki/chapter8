//すでに存在する記事のIDをURLから取得し、既存データを取得
//既存データを初期値として表示し、ユーザーが変更
//変更された内容だけを PUT （/api/admin/posts/:id）で更新するページ


//useEffectでカテゴリー一覧を取得して、チェックボックスで表示する

//チェックボックスの選択状態の管理にuseStateを使う理由は、Reactはどのチェックボックスが選択されているかを把握できないため。
//チェックボックスをクリック→選択されたカテゴリーIDをselectedCategoriesに追加・削除→selectedCategoriesの状態に基づいて、どのチェックボックスが選択されているかを判断
//→フォーム送信時に、その id 配列を取り出す→バックエンドが期待する形に整形する→ POST で API に渡す

//チェックボックスがクリックされたときに呼ばれる関数。複数選択のチェックボックスの際に、選択・解除の両方に対応するためのロジック

//useEffectは責務で分ける必要あり。今回は、カテゴリー一覧取得と記事取得は同じ処理ではないため、分ける。
// 具体的には、カテゴリー一覧は、postIDに依存しない画像共通データとして画面上に1回しか表示させない。
// 一方、記事は特定IDに依存するデータであり、postIdが変わったら再取得が必要。

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PostForm from "@/app/_components/Form/PostForm";

/* ===== 型定義 ===== */

type Category = {
  id: number;
  name: string;
}

type PostCategory = {
  category: Category
}

type Post = {
  id: number;
  title: string;
  createdAt: string;
  content: string;
  thumbnailUrl: string;
  postCategories: PostCategory[]
}

/* ===== Props（動的ルート） ===== */

type Props = {
  params: {
    id: string;
  };
};
//app/admin/posts/[id]/page.tsx
//この [id] に対してNext.js は 自動でこういう props を渡すため、このような型定義が必要。
//{
//  params: {
//    id: "〇"
//  }
//}

/* ===== コンポーネント ===== */

export default function AdminEditPostPage({ params }: Props) {
  const router = useRouter();
  //JavaScriptからページ遷移をするための道具を取得している。後に記載しているrouter.push("/admin/posts");で更新後にページ遷移したいため
  const postId = params.id;

  /* ===== カテゴリー一覧 ===== */
  const [categories, setCategories] = useState<Category[]>([]);

  /* ===== 初期表示用データ ===== */
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");


  /* ===== カテゴリー選択状態 ===== */
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  /* ===== カテゴリー取得 ===== */
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(data.categories);
    }
    fetchCategories();
  }, [])

  /* ===== 記事詳細取得 ===== */
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/admin/posts/${postId}`)
      const json = await res.json();
      const data: Post = json.post;
      setTitle(data.title);
      setContent(data.content);
      setThumbnailUrl(data.thumbnailUrl);
      setSelectedCategories(
        data.postCategories.map((pc) => pc.category.id)
      )
      //PostCategory[] → number[]にデータ整形している作業
    };
    fetchPost();
  }, [postId])

  /* ===== チェックボックス切替 ===== */
  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id)
        ? prev.filter((categoryId) => categoryId !== id)
        : [...prev, id]
    );
  };

  /* ===== 更新処理 ===== */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      thumbnailUrl: formData.get("thumbnailUrl") as string,
      categories: selectedCategories.map((id) => ({ id })),
    };

    await fetch(`/api/admin/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("記事を更新しました");
    router.push("/admin/posts");
  };

  const handleDelete = async () => {
    const ok = window.confirm("本当に削除しますか？");
    if (!ok) return;
    await fetch(`/api/admin/posts/${postId}`, {
      method: "DELETE",
    });
    alert("記事を削除しました");
    router.push("/admin/posts");

  }

  return (
    <PostForm
      title="記事編集"
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      initialValues={{
        title,
        content,
        thumbnailUrl,
      }}
      categories={categories}
      selectedCategories={selectedCategories}
      onToggleCategory={toggleCategory}
    />
  )

}
