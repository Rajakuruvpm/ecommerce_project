import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk('products/fetchAll', async (keyword = '') => {
    const { data } = await axios.get(`/api/products?keyword=${keyword}`)
    return data
})

export const fetchProductDetails = createAsyncThunk('products/fetchDetails', async (id) => {
    const { data } = await axios.get(`/api/products/${id}`)
    return data
})

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        product: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => { state.loading = true })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.items = Array.isArray(action.payload) ? action.payload : []
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.product = action.payload
            })
    },
})

export default productSlice.reducer
