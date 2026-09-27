import type { CategoryFilter } from "@/constants/menu";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

type MenuState = {
  items: MenuItem[];
  stopList: MenuItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filters: {
    category: CategoryFilter;
    search: string;
  };
};

const initialState: MenuState = {
  items: [],
  stopList: [],
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
      const response = await fetch("/src/data/menu.json");
      if (!response.ok) {
        return rejectWithValue(`Не удалось загрузить меню: ${response.status}`);
      }
      return (await response.json()) as MenuItem[];
    } catch {
      return rejectWithValue("Не удалось загрузить меню");
    }
  },
);

const normalize = (value: string) => value.trim().toLocaleLowerCase("ru");

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuItems(state, action: PayloadAction<MenuItem[]>) {
      state.items = action.payload;
    },
    addToStopList(state, action: PayloadAction<MenuItem>) {
      state.stopList.push(action.payload);
    },
    removeFromStopList(state, action: PayloadAction<number>) {
      state.stopList = state.stopList.filter((item) => item.id !== action.payload);
    },
    setCategory(state, action: PayloadAction<CategoryFilter>) {
      state.filters.category = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
    },
    resetMenuFilters(state) {
      state.filters.category = "all";
      state.filters.search = "";
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
          const matchesStopList = stopList.every((stopListItem) => item.id !== stopListItem.id);

          return matchesCategory && matchesSearch && matchesStopList;
        });
      },
    ),
  },
});

export const {
  setCategory,
  setSearch,
  resetMenuFilters,
  setMenuItems,
  addToStopList,
  removeFromStopList,
} = menuSlice.actions;
export const { selectFilteredMenuItems } = menuSlice.selectors;
export const menuReducer = menuSlice.reducer;
