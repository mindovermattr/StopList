import { Button } from "@/components/Button/Button";
import { CATEGORY_LABELS, REASON_LABELS } from "@/constants/menu";
import { useAppDispatch } from "@/store";
import { removeFromStopList, type StopListItem } from "@/store/slices/menu.slice";
import { formatPrice } from "@/utils/formatPrice";
import clsx from "clsx";
import {
  CircleEllipsisIcon,
  ClockIcon,
  MessageSquareIcon,
  PackageXIcon,
  RotateCcwIcon,
  TriangleAlertIcon,
  UserXIcon,
  type LucideIcon,
} from "lucide-react";
import styles from "./StopListCard.module.css";

type StopListCardProps = StopListItem;

const REASON_CLASS: Record<StopListItem["reason"], string> = {
  out_of_stock: styles["card--out-of-stock"],
  bad_quality: styles["card--bad-quality"],
  no_cook: styles["card--no-cook"],
  other: styles["card--other"],
};

const REASON_ICON: Record<StopListItem["reason"], LucideIcon> = {
  out_of_stock: PackageXIcon,
  bad_quality: TriangleAlertIcon,
  no_cook: UserXIcon,
  other: CircleEllipsisIcon,
};

export function StopListCard({
  id,
  name,
  category,
  price,
  portionsLeft,
  reason,
  comment,
  returnAt,
}: StopListCardProps) {
  const dispatch = useAppDispatch();
  const ReasonIcon = REASON_ICON[reason];

  return (
    <article className={clsx(styles.card, REASON_CLASS[reason], "fade-in")}>
      <div className={styles.card__head}>
        <span className={styles.card__reason}>
          <ReasonIcon size={18} className={styles.card__reasonIcon} aria-hidden="true" />
          {REASON_LABELS[reason]}
        </span>
        <span className={styles.card__price}>{formatPrice(price)}</span>
      </div>

      <h4 className={styles.card__name}>{name}</h4>

      <p className={styles.card__meta}>
        {CATEGORY_LABELS[category]} · Порций: {portionsLeft}
      </p>

      {comment && (
        <p className={styles.card__comment}>
          <MessageSquareIcon size={14} className={styles.card__commentIcon} aria-hidden="true" />
          <span>{comment}</span>
        </p>
      )}

      <div className={styles.card__return}>
        <ClockIcon size={16} className={styles.card__returnIcon} aria-hidden="true" />
        <span className={styles.card__returnAt}>Вернётся в {returnAt}</span>
      </div>

      <div className={styles.card__footer}>
        <Button
          className={styles.card__action}
          variant="secondary"
          size="sm"
          fullWidth
          icon={<RotateCcwIcon size={16} />}
          onClick={() => dispatch(removeFromStopList(id))}
        >
          Вернуть
        </Button>
      </div>
    </article>
  );
}
