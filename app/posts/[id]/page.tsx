"use client";
import Image from "next/image";
import classes from "./page.module.css";
import { useState, useEffect } from "react";
import { supabase } from "@/app/_libs/supabase";
import { useFetch } from "@/app/_hooks/useFetch";

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
  thumbnailImageKey: string;
  postCategories: PostCategory[]
}

type PostDetailResponse = {
  post: Post;
};

export default function Detail({ params }: Props) {
  const postId = params.id
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const{data,error,isLoading} = useFetch<PostDetailResponse>(`posts/${postId}`)

 const post = data?.post;

  useEffect(() => {
    if (!post?.thumbnailImageKey) return;

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("post_thumbnail")
      .getPublicUrl(post.thumbnailImageKey);

    setThumbnailUrl(publicUrl);
  }, [post]);

  if (isLoading) {
    return <div>読み込み中...</div>
  }

  if (!post) {
    return <div>記事が見つかりません</div>
  }


  return (
    <>
      <div className={classes.article}>
        {post.thumbnailImageKey && (
          <div>
            {thumbnailUrl && (
              <div className={classes.thumbnailWrapper}>
                <Image
                  src={thumbnailUrl}
                  alt="thumbnail"
                  fill
                  className={classes.thumbnail}
                  priority
                />
              </div>
            )}
          </div>
        )}
        <div className={classes.meta}>

          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span>
            {post.postCategories.map((pc) => {
              return (
                <span className={classes.categories} key={pc.category.id}>{pc.category.name}</span>
              )
            })}
          </span>
        </div>
        <h1>{`APIで取得した${post.title}`}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    </>
  )
}
