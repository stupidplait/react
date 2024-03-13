import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
    status: 'idle',
    error: null,
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (controller) => {
    const response = await fetch('https://dummyjson.com/products', { signal: controller.signal, });
    const { products } = await response.json();

    return products.map(product => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        category: product.category,
        remains: Math.floor(Math.random() * 11),
    }));
});

export const addProduct = createAsyncThunk('products/addProduct', async (productData, { getState }) => {
    const response = await fetch('https://dummyjson.com/products/add', { method: 'POST', body: productData });
    const { id } = await response.json();

    return { id: selectProductsIds(getState()).at(-1) + 1, ...productData };
});

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        toggledFavorite(state, action) {
            const { productId } = action.payload;

            const existingProduct = state.entities[productId];
            if (existingProduct) existingProduct.isLiked = !existingProduct.isLiked;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.status = 'pending';
        }).addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            productsAdapter.upsertMany(state, action.payload);
        }).addCase(fetchProducts.rejected, (state, action) => {
            if (action.error.name === 'AbortError') return;

            state.status = 'rejected';
            state.error = action.error.message;
        }).addCase(addProduct.fulfilled, productsAdapter.addOne);
    },
});

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductsIds,
} = productsAdapter.getSelectors(state => state.products);

export const selectProductsByIds = createSelector(
    [selectAllProducts, (state, cartEntities) => cartEntities],
    (products, cartEntities) => products.filter(product => cartEntities[product.id])
);

export const { toggledFavorite } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;