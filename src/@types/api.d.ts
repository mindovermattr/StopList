// Позиция меню — из menu.json
type MenuItem = {
  id: number;
  name: string; // «Том ям с креветками»
  category: "kitchen" | "bar" | "dessert";
  price: number; // в рублях
  portionsLeft: number; // остаток порций на кухне
};
// Запись в стоп-листе
type StopListEntry = {
  itemId: number;
  reason: "out_of_stock" | "bad_quality" | "no_cook" | "other";
  comment: string; // может быть пустым, кроме причины «Другое»
  returnAt: string; // '18:30'
  createdAt: string; // ISO-строка, момент добавления
};
