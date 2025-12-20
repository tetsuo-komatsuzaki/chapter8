import classes from "./postItem.module.css"
import  Link  from "next/link";
import { MicroCmsPost } from "@/app/_types/_MicroCmcPost";


type PostItemProps = {
  post : MicroCmsPost
}

export default function PostItem({ post }: PostItemProps) {

  const date = new Date(post.createdAt);
  const maxLength = 50;
  const contentReview =
    post.content.length > maxLength
      ? post.content.substring(0, maxLength) + "..."
      : post.content;;

  return (
    <>



      <Link href={`/posts/${post.id}`} className={classes.linkwap}>
        <div className={classes.article}>
          <div className={classes.meta}>
            <span>{date.toLocaleDateString()}</span>
            <span>
              {(post.category ?? []).map((category) => {
                return (
                  <span className={classes.categories} key={category.id}>{category.name}</span>
                )
              })}
            </span>

          </div>
          <h1>{post.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: contentReview }}></p>
        </div>
      </Link>
    </>

  )

}