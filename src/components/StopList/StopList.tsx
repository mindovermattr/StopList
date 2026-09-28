import { useAppSelector } from "@/store";
import styles from "./StopList.module.css";
import { StopListCard } from "./StopListCard/StopListCard";
import { StopListEmpty } from "./StopListEmpty/StopListEmpty";

export function StopList() {
  const stopListEntries = useAppSelector((state) => state.menu.stopList);
  const menuItemsCount = useAppSelector((state) => state.menu.items.length);

  const stopListItemsCount = stopListEntries.length;
  return (
    <div className={styles.stoplist}>
      <div className={styles.stoplist__header}>
        <h3>Стоп-лист</h3>
        <p> {menuItemsCount && `${stopListItemsCount} / ${menuItemsCount}`}</p>
      </div>
      <div className={styles.stoplist__items}>
        {stopListItemsCount === 0 ? (
          <StopListEmpty />
        ) : (
          stopListEntries.map((entry) => <StopListCard key={entry.itemId} {...entry} />)
        )}
      </div>
    </div>
  );
}
