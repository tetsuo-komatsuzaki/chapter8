"use client";

import PostItem from "@/app/_components/PostItem/postItem";
import {useFetch} from "@/app/_hooks/useFetch"


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

const {data,error,isLoading} = useFetch<PostType>("posts")


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


