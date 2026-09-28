import { Button } from "@/components/UI/Button/Button";
import { CATEGORY_LABELS, REASON_LABELS } from "@/constants/menu";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeFromStopList } from "@/store/slices/menu.slice";
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

type StopListCardProps = StopListEntry;

const REASON_CLASS: Record<StopListEntry["reason"], string> = {
  out_of_stock: styles["card--out-of-stock"],
  bad_quality: styles["card--bad-quality"],
  no_cook: styles["card--no-cook"],
  other: styles["card--other"],
};

const REASON_ICON: Record<StopListEntry["reason"], LucideIcon> = {
  out_of_stock: PackageXIcon,
  bad_quality: TriangleAlertIcon,
  no_cook: UserXIcon,
  other: CircleEllipsisIcon,
};

export function StopListCard({ comment, reason, itemId, returnAt }: StopListCardProps) {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) =>
    state.menu.items.find((candidate) => candidate.id === itemId),
  );
  const ReasonIcon = REASON_ICON[reason];

  if (!item) return null;

  return (
    <article className={clsx(styles.card, REASON_CLASS[reason], "fade-in")}>
      <div className={styles.card__head}>
        <span className={styles.card__reason}>
          <ReasonIcon size={18} className={styles.card__reasonIcon} aria-hidden="true" />
          {REASON_LABELS[reason]}
        </span>
        <span className={styles.card__price}>{formatPrice(item.price)}</span>
      </div>

      <h4 className={styles.card__name}>{item.name}</h4>

      <p className={styles.card__meta}>
        {CATEGORY_LABELS[item.category]} · Порций: {item.portionsLeft}
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
          onClick={() => dispatch(removeFromStopList(itemId))}
        >
          Вернуть
        </Button>
      </div>
    </article>
  );
}
