import { SoupIcon } from "lucide-react";
import styles from "./MenuItemCard.module.css";
import { formatPrice } from "@/utils/formatPrice";

type MenuItemCardProps = Omit<MenuItem, "id">;

export function MenuItemCard({ name, category, price, portionsLeft }: MenuItemCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles["card__content"]}>
        <p>{category}</p>
        <h4>{name}</h4>
        <p>{formatPrice(price)}</p>
        <p>
          <SoupIcon size={18} /> {portionsLeft}
        </p>
      </div>
      <button>В стоп-лист </button>
    </article>
  );
}
