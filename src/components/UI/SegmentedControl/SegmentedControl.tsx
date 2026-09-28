import clsx from "clsx";
import styles from "./SegmentedControl.module.css";

type SegmentedOption<T extends string> = {
  value: T;
  label: string;
};

type SegmentedControlProps<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  name: string;
  className?: string;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  name,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div className={clsx(styles.group, className)} role="radiogroup">
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <label
            key={option.value}
            className={clsx(styles.item, isActive && styles["item--active"])}
          >
            <input
              className={styles["item__input"]}
              type="radio"
              name={name}
              value={option.value}
              checked={isActive}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}
