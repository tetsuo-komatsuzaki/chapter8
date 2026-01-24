"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Styles from "./page.module.css";
import { useSupabaseSession } from "@/_hooks/useSupabaseSession";
import { useAdminFetch } from "@/app/admin/_hooks/useAdminFetch";

/* ===== 型定義 ===== */

type Category = {
    id: number;
    name: string
}

type PostCategory = {
    category: Category;
}

type Post = {
    id: number;
    title: string;
    createdAt: string;
    postCategories: PostCategory[];
}

type AdminPostResponse = {
    posts: Post[];
}

/* ===== コンポーネント ===== */

export default function AdminPostsPage() {
    const router = useRouter();
    const { token } = useSupabaseSession();

    const {data,error,isLoading} = useAdminFetch<AdminPostResponse>("posts",token ?? undefined)

    const posts = data?.posts || [];

    //空配列を初期値として渡すと、初回レンダリングのみ実行されると理解。記事が増えた場合は、ページリロードすれば更新される。ただし、stateが変更となったときには変更されない

    if (isLoading) {
        return <p>読み込み中...</p>;
    }

    return (

        <div>
            <div className={Styles.top}>
                <h2>記事一覧</h2>
                <button className={Styles.createButton} onClick={() => router.push("/admin/posts/new")}>新規作成</button>
            </div>
            {posts.map((post) => {
                const date = new Date(post.createdAt).toLocaleDateString("ja-JP");

                return (
                    <Link href={`/admin/posts/${post.id}`} key={post.id}>
                        <div className={Styles.PostItem} key={post.id}>
                            <div>{post.title}</div>
                            <div className={Styles.date}>{date}</div>
                        </div>
                    </Link>
                )
            })}
        </div>


    )
}