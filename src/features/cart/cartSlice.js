import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";

const cartAdapter = createEntityAdapter();

const initialState = cartAdapter.getInitialState();

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addedToCart(state, action) {
            const { productId } = action.payload;

            const existingCartItem = state.entities[productId];

            if (existingCartItem) existingCartItem.quantity++;
            else {
                cartAdapter.addOne(state, {
                    id: productId,
                    quantity: 1,
                });
            };
        },
        removedFromCart(state, action) {
            const { productId } = action.payload;

            const existingCartItem = state.entities[productId];
            if (existingCartItem) cartAdapter.removeOne(state, existingCartItem.id);
        },
        decremented(state, action) {
            const { productId } = action.payload;

            const existingCartItem = state.entities[productId];

            if (existingCartItem) existingCartItem.quantity--;
            if (!existingCartItem.quantity) cartAdapter.removeOne(state, existingCartItem.id);
        },
        incremented(state, action) {
            const { productId } = action.payload;

            const existingCartItem = state.entities[productId];
            if (existingCartItem) existingCartItem.quantity++;
        },
    },
});

export const {
    selectAll: selectAllCart,
    selectEntities: selectCartEntities,
    selectById: selectCartById,
} = cartAdapter.getSelectors(state => state.cart);

export const selectCartQuantityById = createSelector(
    [selectCartEntities, (state, productId) => productId],
    (cartItems, productId) => cartItems[productId]?.quantity
);

export const { addedToCart, removedFromCart, decremented, incremented } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;