"use client"

import Styles from "./PostForm.module.css"
import { useEffect,useState } from "react"

type PropsValues = {
    title:string;
    content:string;
    thumbnailUrl:string;
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

}


export default function PostForm({title,submitLabel,onSubmit,onDelete,initialValues,selectedCategories,onToggleCategory}:PostFormProps){
  const [categories, setCategories] = useState<Category[]>([]); 
  
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(data.categories);
    }
    fetchCategories();
  }, [])

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
          <label htmlFor="thumbnailUrl">サムネイルURL</label>
          <input
            type="text"
            id="thumbnailUrl"
            name="thumbnailUrl"
            defaultValue={initialValues?.thumbnailUrl}
            required
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