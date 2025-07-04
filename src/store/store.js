import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themSlice';
import productsSlice from './Products-slice';


export const store = configureStore({
  reducer: {
    theme: themeReducer,
    products: productsSlice,
    
  }

});