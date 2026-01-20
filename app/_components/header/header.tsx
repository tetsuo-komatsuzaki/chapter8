'use client'

import classes from "./header.module.css"
import  Link  from "next/link"
import { useSupabaseSession } from "@/_hooks/useSupabaseSession"
import { supabase } from "@/app/_libs/supabase"
import { useRouter } from "next/navigation"



export const Header : React.FC=() => {
  const router = useRouter();

  const handleLogout = async() =>{
    await supabase.auth.signOut()
    await router.replace('/')
  }

  const {session,isLoading} = useSupabaseSession();
  return (
    <>
      <header className={classes.header}>
        <Link href="/posts" className={classes.article}>
        Blog
        </Link>
        {!isLoading && (
          <div className="flex items-center gap-4">
            {session ? (
              <>
              <Link href="/admin/posts" className="header-link">
              管理画面
              </Link>
              <button onClick={handleLogout}>
                ログアウト
              </button>
              </>
            ):(
              <>
              <Link href="/contact" className="header-link">
              お問い合わせ
              </Link>
              <Link href="/sign_in" className="header-link">
              ログイン
              </Link>
              </>
            )}
          </div>
        )}
        
      </header>
    </>
  )
}