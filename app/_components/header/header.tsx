import classes from "./header.module.css"
import Link  from "next/link"


export default function Header() {
  return (
    <>
      <header className={classes.header}>
        <Link href="/" className={classes.article}>Blog</Link>
        <Link href="/inquiry" className={classes.article}>お問い合わせ</Link>
      </header>
    </>
  )
}