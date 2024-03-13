import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const categoriesAdapter = createEntityAdapter();

const initialState = categoriesAdapter.getInitialState();

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    const categories = await response.json();

    return categories.map((category, index) => ({ id: index, name: category }));
});

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchCategories.fulfilled, categoriesAdapter.setAll);
    }
});

export const {
    selectAll: selectAllCategories,
} = categoriesAdapter.getSelectors(state => state.categories);

export const categoriesReducer = categoriesSlice.reducer;