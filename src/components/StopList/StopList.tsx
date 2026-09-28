import { useAppSelector } from "@/store";
import { selectStopListItems } from "@/store/slices/menu.slice";
import styles from "./StopList.module.css";
import { StopListCard } from "./StopListCard/StopListCard";
import { StopListEmpty } from "./StopListEmpty/StopListEmpty";

export function StopList() {
  const stopListItems = useAppSelector(selectStopListItems);
  const menuItemsCount = useAppSelector((state) => state.menu.items.length);

  const stopListItemsCount = stopListItems.length;
  return (
    <div className={styles.stoplist}>
      <div className={styles.stoplist__header}>
        <h3>Стоп-лист</h3>
        <p>
          {" "}
          {stopListItemsCount} / {menuItemsCount}
        </p>
      </div>
      <div className={styles.stoplist__items}>
        {stopListItemsCount === 0 ? (
          <StopListEmpty />
        ) : (
          stopListItems.map((item) => <StopListCard key={item.itemId} {...item} />)
        )}
      </div>
    </div>
  );
}
