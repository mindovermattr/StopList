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
import { Loader } from "../UI/Loader/Loader";
import { StopList } from "../StopList/StopList";
import styles from "./Menu.module.css";
import { MenuEmpty } from "./MenuEmpty/MenuEmpty";
import { MenuError } from "./MenuError/MenuError";
import { MenuFilter } from "./MenuFilter/MenuFilter";
import { MenuItemCard } from "./MenuItemCard/MenuItemCard";

export type MenuFilters = { category: CategoryFilter; search: string };

export function Menu() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.menu.status);
  const error = useAppSelector((state) => state.menu.error);
  const filteredItems = useAppSelector(selectFilteredMenuItems);
  const category = useAppSelector((state) => state.menu.filters.category);
  const dispatchSearch = useDebounceCallback((value: string) => dispatch(setSearch(value)), 175);

  const isLoading = status === "idle" || status === "loading";

  useEffect(() => {
    dispatch(fetchMenu());
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
          {isLoading ? (
            <div className={styles["items__loading"]}>
              <Loader>
                <span>Данные загружаются…</span>
              </Loader>
            </div>
          ) : error ? (
            <MenuError onRetry={() => dispatch(fetchMenu())} />
          ) : filteredItems.length === 0 ? (
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
