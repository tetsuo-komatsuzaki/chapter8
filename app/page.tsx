"use client";

import PostItem from "@/app/_components/PostItem/postItem";
import { useEffect, useState} from "react";
import { MicroCmsPost } from "./_types/_MicroCmcPost";  


type Post = {
    id: number
  title: string
  thumbnailUrl: string
  createdAt: string
  categories: string[]
  content: string
};

type PostType = {
  posts : Post[];
};



export default function Post() {
  const [posts,setPosts] = useState<MicroCmsPost[]>([]);
  const [loading,setLoading] = useState<boolean>(false)

useEffect(() =>{
  const fetcher = async() =>{
    setLoading(true)
    const res = await fetch(`https://tetsuo9293.microcms.io/api/v1/blog`,{
      headers: {
        'X-MICROCMS-API-KEY':process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
      },
    })
    const {contents}= await res.json();
    setPosts(contents)
    setLoading(false)
  }
  fetcher()
},[])
if(loading){
  return <div>読み込み中...</div>
}

if(!loading&&posts.length === 0){
  return <div>記事が見つかりません</div>
}

  return (

    <>
      {posts.map((elem) => (
        <PostItem key={elem.id} post={elem} />
      ))}

    </>

  );
}


