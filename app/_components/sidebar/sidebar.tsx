import Link from "next/link";
import styles from "./sidebar.module.css";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname()
  const isSelected = (href: string) => {
    return pathname.includes(href)
  }

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.nav}>
          <li className={styles.item}>
            <Link 
            href="/admin/posts"
          className={`p-4 block hover:bg-blue-100 ${
          isSelected('/admin/posts') && 'bg-blue-100'  }`}
            >記事一覧</Link></li>
          <li className={styles.item}>
            <Link 
            href="/admin/categories"
             className={`p-4 block hover:bg-blue-100 ${
          isSelected('/admin/categories') && 'bg-blue-100'
        }`}
            >カテゴリー一覧</Link></li>
        </ul>
      </nav>
    </aside>
  )
}

