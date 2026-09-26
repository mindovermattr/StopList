import type { CategoryFilter } from "@/constants/menu";
import { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { MenuFilter } from "./MenuFilter/MenuFilter";
import { MenuItemCard } from "./MenuItemCard/MenuItemCard";

export function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [category, setCategory] = useState<CategoryFilter>("all");

  useEffect(() => {
    fetch("/src/data/menu.json")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
  }, []);

  const visibleItems =
    category === "all" ? menuItems : menuItems.filter((item) => item.category === category);

  return (
    <section className={styles.menu}>
      <h1>Меню ресторана</h1>

      <div className={styles["menu__content"]}>
        <section className={styles.items}>
          <h3>Доступные позиции</h3>
          <MenuFilter category={category} onCategoryChange={setCategory} />
          {visibleItems.map((item) => (
            <MenuItemCard key={item.id} {...item} />
          ))}
        </section>
        <article>
          <h3>Стоп лист</h3>
        </article>
      </div>
    </section>
  );
}
