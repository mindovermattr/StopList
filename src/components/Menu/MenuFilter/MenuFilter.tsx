import { Input } from "@/components/Input/Input";
import { SegmentedControl } from "@/components/SegmentedControl/SegmentedControl";
import type { CategoryFilter } from "@/constants/menu";
import { CATEGORY_FILTER_OPTIONS } from "@/constants/menu";
import styles from "./MenuFilter.module.css";
import type { MenuFilters } from "../Menu";

type MenuFilterProps = {
  category: CategoryFilter;
  onFilterChange: (filter: Partial<MenuFilters>) => void;
};

export function MenuFilter({ category, onFilterChange }: MenuFilterProps) {
  return (
    <div className={styles.filter}>
      <Input
        className={styles["filter__input"]}
        type="search"
        placeholder="Поиск по названию"
        onChange={(e) => onFilterChange({ search: e.target.value })}
      />

      <SegmentedControl
        className={styles["filter__categories"]}
        name="category"
        options={CATEGORY_FILTER_OPTIONS}
        value={category}
        onChange={(value) => onFilterChange({ category: value })}
      />
    </div>
  );
}
