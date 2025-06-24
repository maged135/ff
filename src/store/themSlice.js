import { createSlice } from '@reduxjs/toolkit';

// اقرأ القيمة المحفوظة من localStorage (true/false)
const savedTheme = localStorage.getItem("darkMode") === "true";

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: savedTheme, // ← دي القيمة الأولية
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      // خزّن القيمة الجديدة في localStorage
      localStorage.setItem("darkMode", state.darkMode);
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
