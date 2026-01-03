"use client";
import Image from "next/image";
import classes from "./page.module.css";
import { useState, useEffect } from "react";

type Props = {
  params: {
    id: string;
  };
};

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


export default function Detail({ params }: Props) {
  const postId = params.id
  const [postsDetail, setPostDetail] = useState<Post|null>(null);
  const [loading, setLoading] = useState<boolean>(false)



  useEffect(() => {

    const fetcher = async () => {
      setLoading(true)
      const res = await fetch(`/api/admin/posts/${postId}`)
      const json = await res.json()
      setPostDetail(json.post)
      setLoading(false)
    };
    fetcher()
  }, [postId]);
  if (loading) {
    return <div>読み込み中...</div>
  }

  if (!postsDetail) {
    return <div>記事が見つかりません</div>
  }



  return (
    <>
      <div className={classes.article}>
        <div className={classes.meta}>
          <span>{new Date(postsDetail.createdAt).toLocaleDateString()}</span>
          <span>
            {postsDetail.postCategories.map((pc) => {
              return (
                <span className={classes.categories} key={pc.category.id}>{pc.category.name}</span>
              )
            })}
          </span>
        </div>
        <h1>{`APIで取得した${postsDetail.title}`}</h1>
        <div dangerouslySetInnerHTML={{ __html: postsDetail.content }}></div>
      </div>
    </>
  )
}
