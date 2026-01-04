import Link from "next/link";
import styles from "./sidebar.module.css";

export default function AdminSidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.nav}>
          <li className={styles.item}><Link href="/admin/posts">記事一覧</Link></li>
          <li className={styles.item}><Link href="/admin/categories">カテゴリー一覧</Link></li>
        </ul>
      </nav>
    </aside>
  )
}

