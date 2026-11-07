import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  lastActiveProjectTab: string;
}

const initialState: initialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
  lastActiveProjectTab: "Board",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setLastActiveProjectTab: (state, action: PayloadAction<string>) => {
      state.lastActiveProjectTab = action.payload;
    },
  },
});

export const { setIsSidebarCollapsed, setIsDarkMode, setLastActiveProjectTab } =
  globalSlice.actions;
export default globalSlice.reducer;
