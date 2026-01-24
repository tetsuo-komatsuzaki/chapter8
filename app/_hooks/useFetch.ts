
import useSWR from "swr";

const fetcher = async(url: string) => {
  const res = await fetch(url);
  if(!res.ok){
    throw new Error('データの取得に失敗しました')
  }
  return res.json()
}

export const useFetch=<T>(path:string) => {
  return useSWR<T>(`/api/${path}`,fetcher)
}