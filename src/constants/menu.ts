export const CATEGORIES: MenuItem["category"][] = ["kitchen", "bar", "dessert"];

export const CATEGORY_LABELS: Record<MenuItem["category"], string> = {
  kitchen: "Кухня",
  bar: "Бар",
  dessert: "Десерт",
};

export type CategoryFilter = "all" | MenuItem["category"];

export const CATEGORY_FILTERS: CategoryFilter[] = ["all", ...CATEGORIES];

export const CATEGORY_FILTER_LABELS: Record<CategoryFilter, string> = {
  all: "Все",
  ...CATEGORY_LABELS,
};

export const CATEGORY_FILTER_OPTIONS = CATEGORY_FILTERS.map((value) => ({
  value,
  label: CATEGORY_FILTER_LABELS[value],
}));

export const REASON_LABELS: Record<StopListEntry["reason"], string> = {
  out_of_stock: "Нет в наличии",
  bad_quality: "Плохое качество",
  no_cook: "Нет повара",
  other: "Другое",
};
