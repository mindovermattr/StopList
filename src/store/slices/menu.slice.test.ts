import { describe, expect, it } from "vitest";
import {
  addToStopList,
  menuReducer,
  removeFromStopList,
  selectFilteredMenuItems,
  type StopListItem,
} from "./menu.slice";

const tomyam: MenuItem = {
  id: 1,
  name: "Том ям с креветками",
  category: "kitchen",
  price: 590,
  portionsLeft: 8,
};

const caesar: MenuItem = {
  id: 2,
  name: "Цезарь с курицей",
  category: "kitchen",
  price: 490,
  portionsLeft: 3,
};

const gin: MenuItem = {
  id: 3,
  name: "Джин-тоник",
  category: "bar",
  price: 350,
  portionsLeft: 20,
};

const cheesecake: MenuItem = {
  id: 4,
  name: "Чизкейк",
  category: "dessert",
  price: 320,
  portionsLeft: 5,
};

const ice: MenuItem = {
  id: 5,
  name: "Фруктовый лед",
  category: "dessert",
  price: 320,
  portionsLeft: 5,
};

const makeStopEntry = (item: MenuItem, overrides: Partial<StopListItem> = {}): StopListItem => ({
  id: item.id,
  itemId: item.id,
  name: item.name,
  category: item.category,
  price: item.price,
  portionsLeft: item.portionsLeft,
  reason: "out_of_stock",
  comment: "",
  returnAt: "18:30",
  createdAt: "2026-01-01T00:00:00.000Z",
  ...overrides,
});

const makeRoot = (menu: Partial<ReturnType<typeof menuReducer>> = {}) => ({
  menu: {
    items: [],
    stopList: [],
    status: "idle" as const,
    error: null,
    filters: { category: "all" as const, search: "" },
    ...menu,
  },
});

describe("menu reducer", () => {
  it("добавляет позицию в стоп-лист", () => {
    const entry = makeStopEntry(tomyam);
    const state = menuReducer(undefined, addToStopList(entry));

    expect(state.stopList).toHaveLength(1);
    expect(state.stopList[0].itemId).toBe(tomyam.id);
  });

  it("не добавляет одну и ту же позицию", () => {
    const entry = makeStopEntry(tomyam);
    const state = menuReducer(undefined, addToStopList(entry));
    const nextState = menuReducer(state, addToStopList(entry));

    expect(nextState.stopList).toHaveLength(1);
  });

  it("убирает позицию из стоп-листа", () => {
    const entry = makeStopEntry(tomyam);
    const addedState = menuReducer(undefined, addToStopList(entry));
    const deletedState = menuReducer(addedState, removeFromStopList(entry.itemId));

    expect(deletedState.stopList).toHaveLength(0);
  });
});

describe("selectFilteredMenuItems", () => {
  it("возвращает все позиции, кроме находящихся в стоп-листе", () => {
    const state = makeRoot({
      items: [tomyam, caesar, gin, cheesecake],
      stopList: [makeStopEntry(gin)],
    });

    expect(selectFilteredMenuItems(state)).toEqual([tomyam, caesar, cheesecake]);
  });

  it("фильтрует по категории", () => {
    const state = makeRoot({
      items: [tomyam, caesar, gin, cheesecake, ice],
    });

    const allFilter = selectFilteredMenuItems({
      ...state,
      menu: {
        ...state.menu,
        filters: {
          category: "all",
          search: "",
        },
      },
    });

    const barFilter = selectFilteredMenuItems({
      ...state,
      menu: {
        ...state.menu,
        filters: {
          category: "bar",
          search: "",
        },
      },
    });

    const dessertFilter = selectFilteredMenuItems({
      ...state,
      menu: {
        ...state.menu,
        filters: {
          category: "dessert",
          search: "",
        },
      },
    });

    expect(allFilter).toHaveLength(5);
    expect(barFilter).toEqual([gin]);

    expect(dessertFilter).toEqual([cheesecake, ice]);
    expect(dessertFilter).toHaveLength(2);
  });

  it("ищет по названию без учёта регистра", () => {
    const state = makeRoot({ items: [tomyam, caesar, gin, cheesecake] });
    const searching = makeRoot({
      items: [tomyam, caesar, gin, cheesecake],
      filters: { category: "all", search: "ТОМ" },
    });

    expect(selectFilteredMenuItems(searching)).toEqual([tomyam]);
    expect(
      selectFilteredMenuItems({
        ...state,
        menu: { ...state.menu, filters: { category: "all", search: "цезарь" } },
      }),
    ).toEqual([caesar]);
  });

  it("ищет внутри выбранной категории", () => {
    const state = makeRoot({
      items: [tomyam, caesar, gin, cheesecake],
      filters: { category: "kitchen", search: "чиз" },
    });

    expect(selectFilteredMenuItems(state)).toEqual([]);
  });

  it("игнорирует пробелы в запросе", () => {
    const state = makeRoot({
      items: [tomyam, caesar, gin, cheesecake],
      filters: { category: "all", search: "  цезарь  " },
    });

    expect(selectFilteredMenuItems(state)).toEqual([caesar]);
  });

  it("отдаёт пустой массив, когда ничего не найдено", () => {
    const state = makeRoot({
      items: [tomyam, caesar, gin, cheesecake],
      filters: { category: "all", search: "суши" },
    });

    expect(selectFilteredMenuItems(state)).toEqual([]);
  });

  it("позиция, добавленная через addToStopList, исчезает из меню", () => {
    const menu = menuReducer(undefined, addToStopList(makeStopEntry(gin)));
    const state = makeRoot({ items: [tomyam, caesar, gin, cheesecake], stopList: menu.stopList });

    expect(selectFilteredMenuItems(state)).toEqual([tomyam, caesar, cheesecake]);
  });
});
