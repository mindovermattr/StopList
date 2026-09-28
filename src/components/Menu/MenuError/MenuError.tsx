import { Button } from "@/components/UI/Button/Button";
import { ServerCrashIcon } from "lucide-react";
import styles from "./MenuError.module.css";

type MenuErrorProps = {
  onRetry?: () => void;
};

export function MenuError({ onRetry }: MenuErrorProps) {
  return (
    <div className={styles.error}>
      <ServerCrashIcon size={80} className={styles.error__icon} />
      <h3>Не удалось загрузить меню</h3>
      <p className={styles.error__text}>Проверьте соединение и повторите попытку</p>
      {onRetry && (
        <Button className={styles.error__action} onClick={onRetry}>
          Попробовать еще раз
        </Button>
      )}
    </div>
  );
}
