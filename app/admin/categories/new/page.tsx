"use client"
import Styles from "./page.module.css"



export default function AdminCategoryCreatePage() {


    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
const form = e.currentTarget;
  const formData = new FormData(e.currentTarget);

  const payload = {
    name: formData.get("category") as string
  };
  await fetch("/api/admin/categories",{
    method: "POST",
    headers: {
        "Content-Type" : "application/json"
    },
    body: JSON.stringify(payload),
  });

  alert("カテゴリーを作成しました！")
  form.reset();

    }

    return (
        <>
            <div>
                <h1 className={Styles.title}>カテゴリー作成</h1>
            </div>
            <form onSubmit={handleSubmit} >
                <div className={Styles.field}>
                <label htmlFor="category" >
                    カテゴリー
                </label>
                <input type="text" id="category" name="category" required/>
                    </div>
                <button className={Styles.createButton} type="submit">新規作成</button>

            </form>
        </>
    )

}