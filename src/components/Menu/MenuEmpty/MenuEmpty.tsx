import { SearchXIcon } from "lucide-react";
import styles from "./MenuEmpty.module.css";

export function MenuEmpty() {
  return (
    <div className={styles.empty}>
      <SearchXIcon size={80} className={styles.empty__icon} />
      <h3 className={styles.empty__title}>Позиции не найдены</h3>
      <p className={styles.empty__text}>
        Попробуйте ввести другое название или выбрать другую категорию
      </p>
    </div>
  );
}
