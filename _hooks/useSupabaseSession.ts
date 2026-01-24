import { supabase } from "@/app/_libs/supabase"
import { Session } from "@supabase/supabase-js"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

//認証状態を取得するだけの関数
//Supabase に保存されている「現在のログインセッション」を取得して、
//ページ遷移のたびに最新のログイン状態を React の state に反映するカスタムフック

export const useSupabaseSession = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const [token, setToken] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const fetcher = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()
      setSession(session)
      setToken(session?.access_token || null)
    }
    fetcher()
  }, [pathname])
  //[pathname]にしている意味は、ページが変わるたびにログイン状態を確認したいから
  return { session, isLoading: session === undefined, token }
}