"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CategoryForm from "@/app/_components/Form/CategoryForm";
import { useSupabaseSession } from "@/_hooks/useSupabaseSession";

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
  thumbnailImageKey: string;
  postCategories: PostCategory[]
}


type Props = {
  params: {
    id: string;
  }
}


export default function AdminEditCategoryPage({ params }: Props) {
  const { token } = useSupabaseSession();
  const categoryId = params.id
  const router = useRouter();

  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (!token) return
    const fetchName = async () => {
      const res = await fetch(`/api/admin/categories/${categoryId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      })
      const data = await res.json();
      setName(data.category.name);
    }
    fetchName()
  }, [categoryId, token])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if(!token)return
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("category") as string
    }

    await fetch(`/api/admin/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(payload),
    })
    alert("カテゴリーを更新しました")
    router.push("/admin/categories")
  }

  const handleDelete = async () => {
    if(!token)return
    const ok = window.confirm("本当に削除しますか？")
    if (!ok) return;
    await fetch(`/api/admin/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    alert("カテゴリーを削除しました");
    router.push("/admin/categories")

  }


  return (
    <>
      <CategoryForm title="カテゴリー編集" defaultValue={name} onSubmit={handleSubmit} onDelete={handleDelete} submitLabel="更新" />
    </>
  )

}