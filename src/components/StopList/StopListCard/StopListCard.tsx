import { Button } from "@/components/Button/Button";
import { CATEGORY_LABELS, REASON_LABELS } from "@/constants/menu";
import { useAppDispatch } from "@/store";
import { removeFromStopList, type StopListItem } from "@/store/slices/menu.slice";
import { formatPrice } from "@/utils/formatPrice";
import clsx from "clsx";
import { RotateCcwIcon } from "lucide-react";
import styles from "./StopListCard.module.css";

type StopListCardProps = StopListItem;

const REASON_CLASS: Record<StopListItem["reason"], string> = {
  out_of_stock: styles["card__reason--out-of-stock"],
  bad_quality: styles["card__reason--bad-quality"],
  no_cook: styles["card__reason--no-cook"],
  other: styles["card__reason--other"],
};

export function StopListCard({
  id,
  name,
  category,
  price,
  reason,
  comment,
  returnAt,
}: StopListCardProps) {
  const dispatch = useAppDispatch();

  return (
    <article className={styles.card}>
      <div className={styles.card__content}>
        <div className={styles.card__top}>
          <h4 className={styles.card__name}>{name}</h4>
          <span className={clsx(styles.card__reason, REASON_CLASS[reason])}>
            {REASON_LABELS[reason]}
          </span>
        </div>
        <p className={styles.card__meta}>
          {CATEGORY_LABELS[category]} · {formatPrice(price)}
        </p>
        {comment && <p className={styles.card__comment}>Комментарий: {comment}</p>}
        <p className={styles.card__return}>Вернётся в {returnAt}</p>
      </div>
      <div className={styles.card__footer}>
        <Button
          variant="secondary"
          size="sm"
          icon={<RotateCcwIcon size={16} />}
          onClick={() => dispatch(removeFromStopList(id))}
        >
          Вернуть
        </Button>
      </div>
    </article>
  );
}
