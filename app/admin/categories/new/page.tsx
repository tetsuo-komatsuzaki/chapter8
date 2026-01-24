"use client"


import CategoryForm from "@/app/_components/Form/CategoryForm";
import {  useState } from "react";
import { useSupabaseSession } from "@/_hooks/useSupabaseSession";


export default function AdminCategoryCreatePage() {
  const { token } = useSupabaseSession();
  const [_] = useState(null);

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if(!token)return
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("category") as string
    };

    
    await fetch("/api/admin/categories", {
      method: "POST",
      headers: { 
        "Content-Type":'application/json' ,
        Authorization: token},
      body: JSON.stringify(payload),
    });
    alert("カテゴリーを作成しました！");

    form.reset(); 

  }


  return (
    <>
      <CategoryForm title="カテゴリー作成" onSubmit={handleSubmit} submitLabel="新規作成" />
    </>
  )

}