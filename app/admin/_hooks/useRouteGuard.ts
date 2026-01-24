import { useSupabaseSession     } from "@/_hooks/useSupabaseSession";
import { useRouter }  from "next/navigation";
import { useEffect } from "react";


export const useRouteGurd = () =>{
    const router = useRouter();
    const{session,isLoading}= useSupabaseSession()

    useEffect(() =>{
        if(isLoading)return
        const fetcher = async () =>{
            if(session === null){
                router.replace('/sign_in')
            }
        }

        fetcher()
    },[router,isLoading,session]
)
}