"use client";
import Image from "next/image";
import classes from "./page.module.css";
import { useState, useEffect } from "react";
import  {Post}  from "@/app/_types/Post";
import { MicroCmsPost } from "@/app/_types/_MicroCmcPost";

type Props = {
  params: {
    id: string;
  };
};

type PostResponse = {
    post : MicroCmsPost;
  }


export default function Detail({params}:Props) {
  const { id } = params;
  const [postsDetail, setPostDetail] = useState<MicroCmsPost | null>(null);
  const [loading, setLoading] = useState<boolean>(false)



  useEffect(() => {

    const fetcher = async () => {
      setLoading(true)
      const res = await fetch(`https://tetsuo9293.microcms.io/api/v1/blog/${id}`,
        {
          headers: {
            'X-MICROCMS-API-KEY':process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
          }
        }
      )
      const data:MicroCmsPost = await res.json()
      setPostDetail(data)
      console.log("APIレスポンス:", data)
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
        {postsDetail.thumbnail && (<Image src={postsDetail.thumbnail.url} alt={postsDetail.title} className={classes.thumbnail} width={800} height={400}/>)}
      </div>
      <div className={classes.article}>
        <div className={classes.meta}>
          <span>{new Date(postsDetail.createdAt).toLocaleDateString()}</span>
          <span>
            {(postsDetail.category ?? []).map((category) => {
              return (
                <span className={classes.categories} key={category.id}>{category.name}</span>
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
