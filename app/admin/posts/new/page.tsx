"use client";


import Styles from "./page.module.css"
import { useState,useEffect } from "react";


type Category = {
    id : number;
    name : string
}



export default function AdminCreatePostPage() {

    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        const fetchCategories = async() =>{
            const res = await fetch("/api/admin/categories");
            const data = await res.json();
            setCategories(data.categories);
        }
        fetchCategories();
    },[])

    //useEffectでカテゴリー一覧を取得して、チェックボックスで表示する

    const[selectedCategories,setSelectedCategories] = useState<number[]>([])
        //チェックボックスの選択状態の管理にuseStateを使う理由は、Reactはどのチェックボックスが選択されているかを把握できないため。
    //チェックボックスをクリック→選択されたカテゴリーIDをselectedCategoriesに追加・削除→selectedCategoriesの状態に基づいて、どのチェックボックスが選択されているかを判断
    //→フォーム送信時に、その id 配列を取り出す→バックエンドが期待する形に整形する→ POST で API に渡す
    const toggleCategory = (id :number) =>{
        setSelectedCategories((prev) =>
            prev.includes(id)
            ? prev.filter((categoryId) => categoryId !== id)
            : [...prev, id]
        )
    }
//チェックボックスがクリックされたときに呼ばれる関数。複数選択のチェックボックスの際に、選択・解除の両方に対応するためのロジック

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(e.currentTarget);

  const payload = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    thumbnailUrl: formData.get("thumbnailUrl") ,
    categories: selectedCategories.map((id) => ({ id })),
  };

  await fetch("/api/admin/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

    alert("記事を作成しました！");
    setSelectedCategories([]);
    form.reset();
};


    return (
        <div>
            <h3 className={Styles.title}>記事作成</h3>
            <form onSubmit={handleSubmit}>
                <div className={Styles.field}>
                    <label htmlFor="title">タイトル</label>
                    <input type="text" id="title" name="title" required/>
                </div>

                <div className={Styles.field}>
                    <label htmlFor="content">内容</label>
                    <textarea name="content" id="content" required>
                    </textarea>
                </div>

                <div className={Styles.field}>
                    <label htmlFor="thumbnailUrl">サムネイルURL</label>
                    <input type="text" id="thumbnailUrl" name="thumbnailUrl" required/>
                </div>
                <div className={Styles.field}>
                    <label htmlFor="category">カテゴリー</label>
                    {categories.map((category) =>{
                        return (
                           <label key={category.id}>
                            <input type="checkbox" name="categories" value={category.id}  
                            onChange={()=>toggleCategory(category.id)}
                            checked={selectedCategories.includes(category.id)}
                            />
                            {category.name}
                           </label>
                        )
                    })}

                </div>
                <button className={Styles.createButton} type="submit">作成</button>
            </form>
        </div>
        //name が「送信データのキー」になり、それがバックエンドのデータ構造定義と一致していれば、問題なく処理される。その時、入力データをJSON に組み立てられており、バックエンドに送信（型定義と合致している必要あり）
    )
}