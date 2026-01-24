"use client";

import PostItem from "@/app/_components/PostItem/postItem";
import useSWR from "swr";


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


type PostType = {
  posts : Post[];
};



export default function Post() {

const fetcher = (url:string) =>
  fetch(url).then(res=>res.json())

const {data,error,isLoading} = useSWR<PostType>('/api/posts',fetcher)


if(isLoading){
  return <div>読み込み中...</div>
}

if(!isLoading && data?.posts.length === 0){
  return <div>記事が見つかりません</div>
}

  return (

    <>
      {data?.posts.map((post) => (
        <PostItem key={post.id} post={post}/>
      ))}

    </>

  );
}


