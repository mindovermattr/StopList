import type { CategoryFilter } from "@/constants/menu";
import { loadFromLocalStorage, LOCAL_STORAGE_KEYS } from "@/utils/localstorage";
import { normalize } from "@/utils/normalize";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

export type StopListItem = MenuItem & StopListEntry;

type MenuState = {
  items: MenuItem[];
  stopList: StopListEntry[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filters: {
    category: CategoryFilter;
    search: string;
  };
};

const initialState: MenuState = {
  items: [],
  stopList: loadFromLocalStorage(LOCAL_STORAGE_KEYS.STOPLIST) ?? [],
  status: "idle",
  error: null,
  filters: {
    category: "all",
    search: "",
  },
};

export const fetchMenu = createAsyncThunk<MenuItem[], void, { rejectValue: string }>(
  "menu/fetchMenu",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/data/menu.json");
      if (!response.ok) {
        return rejectWithValue(`Не удалось загрузить меню: ${response.status}`);
      }
      return (await response.json()) as MenuItem[];
    } catch {
      return rejectWithValue("Не удалось загрузить меню");
    }
  },
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addToStopList(state, action: PayloadAction<StopListEntry>) {
      const isAlreadyInStopList = state.stopList.some(
        (stopListEntry) => stopListEntry.itemId === action.payload.itemId,
      );

      if (!isAlreadyInStopList) {
        state.stopList.push(action.payload);
      }
    },
    removeFromStopList(state, action: PayloadAction<number>) {
      state.stopList = state.stopList.filter(
        (stopListEntry) => stopListEntry.itemId !== action.payload,
      );
    },
    setCategory(state, action: PayloadAction<CategoryFilter>) {
      state.filters.category = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? null;
      });
  },
  selectors: {
    selectFilteredMenuItems: createSelector.withTypes<MenuState>()(
      [
        (state) => state.items,
        (state) => state.filters.category,
        (state) => state.filters.search,
        (state) => state.stopList,
      ],
      (items, category, search, stopList) => {
        const query = normalize(search);

        return items.filter((item) => {
          const matchesCategory = category === "all" || item.category === category;
          const matchesSearch = query === "" || normalize(item.name).includes(query);
          const matchesStopList = stopList.every((stopListEntry) => item.id !== stopListEntry.itemId);

          return matchesCategory && matchesSearch && matchesStopList;
        });
      },
    ),
    selectStopListItems: createSelector.withTypes<MenuState>()(
      [(state) => state.items, (state) => state.stopList],
      (items, stopList) =>
        stopList.flatMap((stopListEntry) => {
          const item = items.find((candidate) => candidate.id === stopListEntry.itemId);

          return item ? [{ ...item, ...stopListEntry }] : [];
        }),
    ),
  },
});

export const { setCategory, setSearch, addToStopList, removeFromStopList } = menuSlice.actions;
export const { selectFilteredMenuItems, selectStopListItems } = menuSlice.selectors;
export const menuReducer = menuSlice.reducer;
