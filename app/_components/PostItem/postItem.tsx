import classes from "./postItem.module.css"
import  Link  from "next/link";


type Category = {
  id: number;
  name: string;
}

type PostCategory = {
  category: Category
}

type Post = {
  id: number;
  title: string;
  createdAt: string;
  content: string;
  thumbnailUrl: string;
  postCategories: PostCategory[]
}

type PostItemProps = {
  post:Post
}



export default function PostItem({ post }: PostItemProps) {
  const date = new Date(post.createdAt);
  const maxLength = 50;
  const contentReview =
    post.content.length > maxLength
      ? post.content.substring(0, maxLength) + "..."
      : post.content;;

  return (
      <Link href={`/posts/${post.id}`} className={classes.linkwap}>
        <div className={classes.article}>
          <div className={classes.meta}>
            <span>{date.toLocaleDateString()}</span>
            <span>
              {post.postCategories?.map((pc) => {
                return (
                  <span className={classes.categories} key={pc.category.id}>{pc.category.name}</span>
                )
              })}
            </span>

          </div>
          <h1>{post.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: contentReview }}></p>
        </div>
      </Link>
  )

}