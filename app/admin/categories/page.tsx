"use client"

import Styles from "./page.module.css"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"


type Category = {
  id: number;
  name: string
}


export default function AdminCategoryPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/categories");
        const data = await res.json();
        setCategories(data.categories)
      } catch (error) {
        console.error("カテゴリー取得エラー", error);
      } finally {
        setLoading(false)
      }
    };
    fetchCategories();
  }, [])

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