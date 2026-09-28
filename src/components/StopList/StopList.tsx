import { useAppSelector } from "@/store";
import styles from "./StopList.module.css";
import { StopListCard } from "./StopListCard/StopListCard";
import { StopListEmpty } from "./StopListEmpty/StopListEmpty";

export function StopList() {
  const stopListItems = useAppSelector((state) => state.menu.stopList);
  const menuItems = useAppSelector((state) => state.menu.items);

  const stopListItemsCount = stopListItems.length;
  const menuItemsCount = menuItems.length;
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
