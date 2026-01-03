"use client";

import PostItem from "@/app/_components/PostItem/postItem";
import { useEffect, useState} from "react";


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


type PostType = {
  posts : Post[];
};



export default function Post() {
  const [posts,setPosts] = useState<Post[]>([]);
  const [loading,setLoading] = useState<boolean>(false)

useEffect(() =>{
  const fetcher = async() =>{
    setLoading(true)
    const res = await fetch(`/api/admin/posts`)
    const json = await res.json();
    setPosts(json.posts)
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
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}

    </>

  );
}


