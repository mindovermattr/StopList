import { useAppSelector } from "@/store";
import styles from "./StopList.module.css";

export function StopList() {
  const stopListItems = useAppSelector((state) => state.menu.stopList);
  return (
    <div className={styles.stoplist}>
      <h3>Стоп-лист</h3>
      <div>
        {stopListItems.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}
