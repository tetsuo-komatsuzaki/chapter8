"use client";



import { useState, useEffect } from "react";
import PostForm from "@/app/_components/Form/PostForm";
import { useSupabaseSession } from "@/_hooks/useSupabaseSession";





export default function AdminCreatePostPage() {
    const {token} = useSupabaseSession()


  //useEffectでカテゴリー一覧を取得して、チェックボックスで表示する

  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
   const [thumbnailImageKey, setThumbnailImageKey] = useState<string>("");
  //チェックボックスの選択状態の管理にuseStateを使う理由は、Reactはどのチェックボックスが選択されているかを把握できないため。
  //チェックボックスをクリック→選択されたカテゴリーIDをselectedCategoriesに追加・削除→selectedCategoriesの状態に基づいて、どのチェックボックスが選択されているかを判断
  //→フォーム送信時に、その id 配列を取り出す→バックエンドが期待する形に整形する→ POST で API に渡す
  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id)
        ? prev.filter((categoryId) => categoryId !== id)
        : [...prev, id]
    )
  }
  //チェックボックスがクリックされたときに呼ばれる関数。複数選択のチェックボックスの際に、選択・解除の両方に対応するためのロジック

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!token)return;

    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);

    const payload = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      thumbnailImageKey,
      categories: selectedCategories.map((id) => ({ id })),
    };

    await fetch("/api/admin/posts", {
      method: "POST",
      headers: { 
        "Content-Type":'application/json' ,
        Authorization: token},
      body: JSON.stringify(payload),
    });
    alert("記事を作成しました！");
    setSelectedCategories([]);
    setThumbnailImageKey("")
    form.reset(); 
  }


  return (
    <PostForm 
    title="記事作成"
    onSubmit={handleSubmit}
    selectedCategories={selectedCategories}
    onToggleCategory={toggleCategory}
    submitLabel="新規作成"
    onImageUploaded={setThumbnailImageKey}
    token={token!}
    />
  )



      
}