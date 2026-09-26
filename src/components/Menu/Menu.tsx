import type { CategoryFilter } from "@/constants/menu";
import { useDebounceState } from "@/hooks/useDebounceState";
import { useEffect, useMemo, useState } from "react";
import styles from "./Menu.module.css";
import { MenuEmpty } from "./MenuEmpty/MenuEmpty";
import { MenuFilter } from "./MenuFilter/MenuFilter";
import { MenuItemCard } from "./MenuItemCard/MenuItemCard";

export type MenuFilters = { category: CategoryFilter; search: string };

export function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [searchTerm, setSearchTerm] = useDebounceState("", 175);

  useEffect(() => {
    fetch("/src/data/menu.json")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems
      .filter((item) => {
        if (category === "all") return true;
        return item.category === category;
      })
      .filter(
        (item) =>
          searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );
  }, [menuItems, searchTerm, category]);

  const handleFilterChange = (patch: Partial<MenuFilters>) => {
    if (patch.category) {
      setCategory(patch.category);
    }
    if ("search" in patch) {
      setSearchTerm(patch.search ?? "");
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
        <article>
          <h3>Стоп лист</h3>
        </article>
      </div>
    </section>
  );
}
