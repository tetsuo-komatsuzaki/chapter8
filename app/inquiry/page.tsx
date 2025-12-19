"use client";

import classes from "./page.module.css";
import { useState } from "react";
import { posts_URL } from "@/app/_data/posts";
import { ErrorMessage } from "@/app/_components/ErrorMessage";

type Form  = {
  name: string;
  email: string;
  message: string;
}

type Error= {
  name?: string;
  email?: string;
  message?: string;
}

export default function Inquiry() {
  const [form, setForm] = useState<Form>({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState<Error>({});

  const validation = (formData : Form) => {
    let isValid = true;
    const errors :Error = {};

    if (!formData.name) {
      errors.name = "お名前は必須です。"
      isValid = false;
    } else if (formData.name.length > 30) {
      errors.name = "お名前は30文字以内で入力してください。"
      isValid = false;
    }

    if (!formData.email) {
      errors.email = "メールアドレスは必須です。"
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "メールアドレスが不完全です"
      isValid = false;
    }

    if (!formData.message) {
      errors.message = "本文は必須です。"
      isValid = false;
    } else if (formData.message.length > 500) {
      errors.message = "メッセージは30文字以内で入力してください。"
      isValid = false;
    }

    setErrors(errors)
    return isValid

  }

  const handleForm = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validation(form);

    if (isValid) {
      return (
        await fetch(
          `${posts_URL}/contacts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
          })
      ), alert('送信しました'),
        handleClear();
    }
  }


  const handleClear = () => {
    setForm({
      name: "",
      email: "",
      message: ""
    })
  }

  return (
    <div className={classes.all}>
      <p>お問い合わせ</p>
      <form onSubmit={handleSubmit}>
        <div className={classes.div}>
          <label htmlFor="name" className={classes.label}>お名前</label>
          <div className={classes.field}>
            <input type="text" id="name" name="name" value={form.name} onChange={handleForm} className={classes.content} />
            <ErrorMessage className={classes.error} message={errors.name} />
          </div>
        </div>
        <div className={classes.div}>
          <label htmlFor="email" className={classes.label}>メールアドレス</label>
          <div className={classes.field}>
            <input type="email" id="email" name="email" value={form.email} onChange={handleForm} className={classes.content} />
            <ErrorMessage className={classes.error} message={errors.email} />
          </div>
        </div>

        <div className={classes.div}>
          <label htmlFor="content" className={classes.label}>本文</label>
          <div className={classes.field}>
            <textarea rows={8} id="content" name="message" value={form.message} onChange={handleForm} className={classes.content} />
            <ErrorMessage className={classes.error} message={errors.message} />
          </div>
        </div>
        <div className={classes.button}>
          <button className={classes.submit} type="submit">送信</button>
          <button className={classes.reset} type="button" onClick={handleClear}>クリア</button>
        </div>
      </form>
    </div>
  )
}