import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
    "productsSlice/fetchProducts",
    async () => {
      const res = await fetch('https://maged135.github.io/qu/db.json'); // ✅ كده صح
      const data = await res.json();
      return data   // رجّعها بنفس الشكل اللي انت متوقعه
    }
  );
  

// Define the initial state with loading and error
const initialState = {
  products: [],
  loading: false,
  error: null
};

const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.products = [];
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        // مهم جدًا: نستخدم products من داخل البيانات
        state.products = action.payload.products || [];

      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        // لا تعيد تعيين products هنا
      });
  }
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
