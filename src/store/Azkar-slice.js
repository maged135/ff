import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// AsyncThunk لتحميل الأذكار من السيرفر
export const aiazkar = createAsyncThunk(
  "azkarSlice/aiazkar",
  async () => {
    const res = await fetch('https://maged135.github.io/azkar.api/azkar.json');
    const data = await res.json();
    return  data  // راجع azkary مش aiazkar
  }
);

const initialState = {
  azkary: [],   // اسم البيانات في الـ state
  loading: false,
  error: null,
};

const azkarSlice = createSlice({
  name: 'azkarSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(aiazkar.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.azkary = [];  // تفريغ البيانات عند بدء التحميل
      })
      .addCase(aiazkar.fulfilled, (state, action) => {
        state.loading = false;
        state.azkary = action.payload.azkary || [];  // إدخال البيانات بعد التحميل
      })
      .addCase(aiazkar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default azkarSlice.reducer;
