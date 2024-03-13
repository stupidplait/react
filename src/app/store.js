import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "../features/products/productsSlice";
import { categoriesReducer } from '../features/categories/categoriesSlice';
import { cartReducer } from "../features/cart/cartSlice";

export default configureStore({
    reducer: {
        products: productsReducer,
        categories: categoriesReducer,
        cart: cartReducer,
    },
});