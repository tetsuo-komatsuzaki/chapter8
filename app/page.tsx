"use client";

import PostItem from "@/_components/PostItem/postItem";
import { posts_URL }from "../_data/posts";

import { useEffect, useState} from "react";

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
  const [posts,setPosts] = useState<Post[]>([]);
  const [loading,setLoading] = useState<boolean>(false)

useEffect(() =>{
  const fetcher = async() =>{
    setLoading(true)
    const res = await fetch(`${posts_URL}/posts`)
    const {posts}:PostType = await res.json();
    setPosts(posts)
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


