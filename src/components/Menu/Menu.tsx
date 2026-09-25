import { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { MenuItemCard } from "./MenuItemCard/MenuItemCard";

export function Menu() {
  const [state, setState] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch("/src/data/menu.json")
      .then((res) => res.json())
      .then((data) => setState(data));
  }, []);

  return (
    <section className={styles.menu}>
      <h1>Меню ресторана</h1>

      <div className={styles["menu__content"]}>
        <section className={styles.items}>
          <h3>Доступные позиции</h3>
          {state.map((item) => (
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
