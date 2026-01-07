"use client"


import CategoryForm from "@/app/_components/Form/CategoryForm";
import { useState } from "react";


export default function AdminCategoryCreatePage() {

  const [_] = useState(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("category") as string
    };
    await fetch("/api/admin/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    });

    alert("カテゴリーを作成しました！")
    form.reset();

  }

  return (
    <>
      <CategoryForm title="カテゴリー作成" onSubmit={handleSubmit} submitLabel="新規作成" />
    </>
  )

}