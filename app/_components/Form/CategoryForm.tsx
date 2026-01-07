//共通フォームの責務は、①入力欄を表示する②submit / delete を「呼ぶだけ」であり、
// APIをたたいたり、URLパラメータを読んだり、データ取得することはやらない！
//そのような処理はprops 経由で対応する。


"use client"
import Styles from "./CategoryForm.module.css"

type CategoryForm = {
  title: string;
  defaultValue?: string;
  submitLabel: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onDelete?: () => void;
}


export default function CategoryForm({ title, defaultValue, onSubmit, onDelete, submitLabel }: CategoryForm) {
  return (
    <>
      <h3 className={Styles.title}>{title}</h3>
      <form action="" className={Styles.field} onSubmit={onSubmit}>
        <div>
          <label htmlFor="category">
            カテゴリー
          </label>
          <input type="text"
            id="category"
            name="category"
            defaultValue={defaultValue}
            required />
        </div>
        <div>
          <button className={Styles.createButton} type="submit">
            {submitLabel}
          </button>
          {onDelete && (<button className={Styles.deleteButton} type="button" onClick={onDelete}>
            削除
          </button>
          )}
        </div>
      </form>
    </>
  )

}