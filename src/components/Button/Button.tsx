import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
};

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: styles["button--primary"],
  secondary: styles["button--secondary"],
  ghost: styles["button--ghost"],
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: styles["button--sm"],
  md: styles["button--md"],
  lg: styles["button--lg"],
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        fullWidth && styles["button--full-width"],
        className,
      )}
      {...props}
    >
      {children}
      {icon && <span className={styles["button__icon"]}>{icon}</span>}
    </button>
  );
}
