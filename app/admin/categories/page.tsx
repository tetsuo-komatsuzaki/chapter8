"use client"

import Styles from "./page.module.css"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useSupabaseSession } from "@/_hooks/useSupabaseSession"

type Category = {
  id: number;
  name: string
}


export default function AdminCategoryPage() {
  const {token} = useSupabaseSession();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if(!token)return
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/categories",{
          headers: {
          'Content-Type': 'application/json',
          Authorization: token, // 👈 Header に token を付与
        },
        });
        const data = await res.json();
        setCategories(data.categories)
      } catch (error) {
        console.error("カテゴリー取得エラー", error);
      } finally {
        setLoading(false)
      }
    };
    fetchCategories();
  }, [token])

  if (loading) {
    return <p>読み込み中...</p>
  }


  return (
    <div>
      <div className={Styles.top}>
        <h2>カテゴリー一覧</h2>
        <button className={Styles.createButton} onClick={(() => router.push("/admin/categories/new"))}>新規作成</button>
      </div>
      {categories.map((category) => {
        return (
          <Link href={`/admin/categories/${category.id}`} key={category.id}>
            <div className={Styles.PostItem}>
              {category.name}
            </div>
          </Link>
        )
      })}
    </div>
  )
}