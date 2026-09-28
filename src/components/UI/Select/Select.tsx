import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import styles from "./Select.module.css";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  options: SelectOption[];
};

export function Select({ className, options, ...props }: SelectProps) {
  return (
    <span className={clsx(styles.select, className)}>
      <select {...props} className={styles.control}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className={styles.icon} size={16} />
    </span>
  );
}
