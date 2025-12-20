export interface MicroCmsPost {
  id: string
  title: string
  content: string
  createdAt: string
  category?: { id: string; name: string }[]
  thumbnail?: { url: string; height: number; width: number }
}
