import clsx from "clsx";
import styles from "./Input.module.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, type = "text", ...props }: InputProps) {
  return <input {...props} type={type} className={clsx(styles.input, className)} />;
}
