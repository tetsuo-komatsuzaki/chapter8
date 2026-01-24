import useSWR from "swr";

const fetcher = async(url: string,token: string ) =>{
  const res = await fetch(url,{
    headers: {
      'Content-Type': 'application/json',
      Authorization:token
    }
  });
  if(!res.ok){
    throw new Error('データの取得に失敗しました')
  }
return res.json()
}

export const useAdminFetch = <T>(path:string,token?:string) =>{
  return useSWR<T>(
    token ? `/api/admin/${path}` : null,
    (url:string) => fetcher(url,token!)

  )
}