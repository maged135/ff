import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themSlice';
import productsSlice from './Products-slice';
import azkarSlice from './Azkar-slice'


export const store = configureStore({
  reducer: {
    theme: themeReducer,
    products: productsSlice,
    azkary: azkarSlice,
  }

});