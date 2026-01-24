"use client"

import Styles from "./page.module.css"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useSupabaseSession } from "@/_hooks/useSupabaseSession"
import { useAdminFetch } from "@/app/admin/_hooks/useAdminFetch"

type Category = {
  id: number;
  name: string
}

type AdminCategoriesResponse = {
  categories: Category[];
}

export default function AdminCategoryPage() {
  const {token} = useSupabaseSession();
  const router = useRouter();

  const{data,error,isLoading}= useAdminFetch<AdminCategoriesResponse>(
    "categories",
    token ?? undefined
  )

  const categories = data?.categories ?? [];

  if (isLoading) {
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