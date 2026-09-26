import { Button } from "@/components/Button/Button";
import { formatPrice } from "@/utils/formatPrice";
import clsx from "clsx";
import { ArrowRightIcon } from "lucide-react";
import styles from "./MenuItemCard.module.css";

type MenuItemCardProps = Omit<MenuItem, "id">;

const CATEGORY_LABELS: Record<MenuItem["category"], string> = {
  kitchen: "Кухня",
  bar: "Бар",
  dessert: "Десерт",
};

export function MenuItemCard({ name, category, price, portionsLeft }: MenuItemCardProps) {
  const isOutOfStock = portionsLeft === 0;

  return (
    <article className={clsx(styles.card, isOutOfStock && styles["card--out-of-stock"])}>
      <div className={styles["card__content"]}>
        <p className={styles["card__category"]}>{CATEGORY_LABELS[category]}</p>
        <h4 className={styles["card__name"]}>{name}</h4>
        <div className={styles["card__info"]}>
          <p className={styles["card__price"]}>{formatPrice(price)}</p>
          <p>Порций: {portionsLeft}</p>
        </div>
      </div>
      <Button icon={<ArrowRightIcon size={18} />} size="sm">
        В стоп-лист
      </Button>
    </article>
  );
}
