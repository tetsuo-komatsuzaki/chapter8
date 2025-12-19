"use client";
import Image from "next/image";
import classes from "./page.module.css";
import  {posts_URL}  from "@/_data/posts"; 
import { useState, useEffect } from "react";
import  {Post}  from "@/_types/Post";

type Props = {
  params: {
    id: string;
  };
};

type PostResponse = {
    post : Post
  }


export default function Detail({params}:Props) {
  const { id } = params;
  const [postsDetail, setPostDetail] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false)



  useEffect(() => {
    const fetcher = async () => {
      setLoading(true)
      const res = await fetch(`${posts_URL}/posts/${id}`)
      const data:PostResponse = await res.json()
      setPostDetail(data.post)
      setLoading(false)
    };
    fetcher()
  }, [id]);
  if (loading) {
    return <div>読み込み中...</div>
  }

  if (!postsDetail) {
    return <div>記事が見つかりません</div>
  }



  return (
    <>
      <div>
        <Image src={postsDetail.thumbnailUrl} alt={postsDetail.title} className={classes.thumbnail} width={800} height={400}/>
      </div>
      <div className={classes.article}>
        <div className={classes.meta}>
          <span>{new Date(postsDetail.createdAt).toLocaleDateString()}</span>
          <span>
            {postsDetail.categories.map((text, index) => {
              return (
                <span className="categories" key={index}>{text}</span>
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
