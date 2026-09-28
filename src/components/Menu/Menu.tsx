import type { CategoryFilter } from "@/constants/menu";
import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  fetchMenu,
  selectFilteredMenuItems,
  setCategory,
  setSearch,
} from "@/store/slices/menu.slice";
import { useEffect } from "react";
import { StopList } from "../StopList/StopList";
import styles from "./Menu.module.css";
import { MenuEmpty } from "./MenuEmpty/MenuEmpty";
import { MenuFilter } from "./MenuFilter/MenuFilter";
import { MenuItemCard } from "./MenuItemCard/MenuItemCard";

export type MenuFilters = { category: CategoryFilter; search: string };

export function Menu() {
  const dispatch = useAppDispatch();
  const filteredItems = useAppSelector(selectFilteredMenuItems);
  const category = useAppSelector((state) => state.menu.filters.category);
  const dispatchSearch = useDebounceCallback((value: string) => dispatch(setSearch(value)), 175);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchMenu()).unwrap();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleFilterChange = (patch: Partial<MenuFilters>) => {
    if (patch.category) {
      dispatch(setCategory(patch.category));
    } else if ("search" in patch) {
      dispatchSearch(patch.search ?? "");
    }
  };

  return (
    <section className={styles.menu}>
      <h1>Меню ресторана</h1>

      <div className={styles["menu__content"]}>
        <section className={styles.items}>
          <h3 className={styles.items__title}>Доступные позиции</h3>
          <MenuFilter category={category} onFilterChange={handleFilterChange} />
          {filteredItems.length === 0 ? (
            <MenuEmpty />
          ) : (
            filteredItems.map((item) => <MenuItemCard key={item.id} {...item} />)
          )}
        </section>
        <StopList />
      </div>
    </section>
  );
}
