"use client"

import { supabase } from "@/app/_libs/supabase";
import Styles from "./PostForm.module.css"
import { ChangeEvent, useEffect,useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import Image from "next/image";

type PropsValues = {
    title:string;
    content:string;
     thumbnailImageKey:string;
}

type Category = {
  id: number;
  name: string;
}

type PostFormProps = {
title:string;
onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
onDelete?: () =>void;
initialValues?: PropsValues;
submitLabel: string;
selectedCategories:number[];
onToggleCategory:(id: number) =>void;
onImageUploaded: (key: string) => void
token: string
}


export default function PostForm({title,submitLabel,onSubmit,onDelete,initialValues,selectedCategories,onImageUploaded,onToggleCategory,token}:PostFormProps){
  const [categories, setCategories] = useState<Category[]>([]); 
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(null)
  const [thumbnailImageKey, setThumbnailImageKey] = useState('')

   useEffect(() => {
    if (!thumbnailImageKey) return

// アップロード時に取得した、thumbnailImageKeyを用いて画像のURLを取得
    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from('post_thumbnail')
        .getPublicUrl(thumbnailImageKey)

      setThumbnailImageUrl(publicUrl)
    }

    fetcher()
  }, [thumbnailImageKey])
  
  useEffect(() => {

    if(!token)return
    
    const fetchCategories = async () => {
      const res = await fetch("/api/admin/categories", {
        headers: {
          Authorization: token,
        },
      });
      const data = await res.json();
      setCategories(data.categories);
    }
    fetchCategories();
  }, [token])


  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (!event.target.files || event.target.files.length == 0) {
      // 画像が選択されていないのでreturn
      return
    }

    const file = event.target.files[0] // 選択された画像を取得

    const filePath = `private/${uuidv4()}` // ファイルパスを指定

    // Supabaseに画像をアップロード
    const { data, error } = await supabase.storage
      .from('post_thumbnail') // ここでバケット名を指定
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    // アップロードに失敗したらエラーを表示して終了
    if (error) {
      alert(error.message)
      return
    }

    // data.pathに、画像固有のkeyが入っているので、thumbnailImageKeyに格納する
    setThumbnailImageKey(data.path)
    onImageUploaded(data.path)
  }




  return(
 <div>
      <h3 className={Styles.title}>{title}</h3>

      <form onSubmit={onSubmit}>
        <div className={Styles.field}>
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={initialValues?.title}
            required
          />
        </div>

        <div className={Styles.field}>
          <label htmlFor="content">内容</label>
          <textarea
            id="content"
            name="content"
            defaultValue={initialValues?.content}
            required
          />
        </div>

        <div className={Styles.field}>
          <label htmlFor="thumbnailImageKey">サムネイルURL</label>
          <input
            type="file"
            id="thumbnailImageKey"
            name="thumbnailImageKey"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <div className={Styles.field}>
          <label htmlFor="category">カテゴリー</label>
          {categories.map((category) => (
            <label key={category.id}>
              <input
                type="checkbox"
                name="categories"
                value={category.id}
                checked={selectedCategories.includes(category.id)}
                onChange={() => onToggleCategory(category.id)}
              />
              {category.name}
            </label>
          ))}
        </div>
        <div>
          <button className={Styles.createButton} type="submit">
            {submitLabel}
          </button>
          <button className={Styles.deleteButton} type="button" onClick={onDelete}>
            削除
          </button>
        </div>

      </form>
    </div>
    )
}