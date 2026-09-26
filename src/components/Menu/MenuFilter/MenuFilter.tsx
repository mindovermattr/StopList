import { SegmentedControl } from "@/components/SegmentedControl/SegmentedControl";
import type { CategoryFilter } from "@/constants/menu";
import { CATEGORY_FILTER_OPTIONS } from "@/constants/menu";
import styles from "./MenuFilter.module.css";
import { useRef } from "react";

type MenuFilterProps = {
  category: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
};

export function MenuFilter({ category, onCategoryChange }: MenuFilterProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.filter}>
      <input ref={inputRef} className={styles["filter__search"]} placeholder="Поиск по названию" />

      <SegmentedControl
        className={styles["filter__categories"]}
        name="category"
        options={CATEGORY_FILTER_OPTIONS}
        value={category}
        onChange={onCategoryChange}
      />
    </div>
  );
}
