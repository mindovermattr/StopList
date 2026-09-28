import { CircleCheckIcon } from "lucide-react";
import styles from "./StopListEmpty.module.css";

export function StopListEmpty() {
  return (
    <div className={styles.empty}>
      <CircleCheckIcon size={32} className={styles.empty__icon} />
      <p>Все позиции в продаже</p>
    </div>
  );
}
