"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Styles from "./page.module.css";
import { useSupabaseSession } from "@/_hooks/useSupabaseSession";


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

/* ===== コンポーネント ===== */

export default function AdminPostsPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { token } = useSupabaseSession();

    useEffect(() => {
        if (!token) return
        //fetchPosts 関数を作っている理由は。①useEffect 自体は async にできない②処理を「名前付きの1まとまり」にしたい③将来「再利用」できるようにするため④責務を分離するため⑤テスト・差し替えのしやすさ
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/admin/posts",{
                    headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
                //ここが「バックエンドにお願いしている瞬間」
                const {posts} = await res.json();
                setPosts([...posts])
                //json形式で受け取ったデータのうち、postsのみ取り出して、setPostに受け渡し
            } catch (error) {
                console.error("カテゴリー取得エラー", error);
            } finally {
                setLoading(false);
            }
            //finallyは、try-catchの後に必ず実行される部分
        };
        fetchPosts();
    }, [token])

    //空配列を初期値として渡すと、初回レンダリングのみ実行されると理解。記事が増えた場合は、ページリロードすれば更新される。ただし、stateが変更となったときには変更されない

    if (loading) {
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