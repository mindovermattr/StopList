import clsx from "clsx";
import { Loader2Icon } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./Loader.module.css";

type LoaderProps = {
  children?: ReactNode;
  className?: string;
};

export function Loader({ children, className }: LoaderProps) {
  return (
    <div role="status" className={clsx(styles.loader, className)}>
      <Loader2Icon className={styles.icon} />
      {children && <span className={styles.text}>{children}</span>}
    </div>
  );
}
