import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

// function get product
export const getProducts = createAsyncThunk("product/getProducts", async() => {
    const response = await axios.get('https://625be98c50128c5702091d71.mockapi.io/api/v1/products');
    return response.data;
})

// membuat async function untuk add product
export const saveProduct = createAsyncThunk("product/saveProduct", async({title, price, image}) => {
    const response = await axios.post('https://625be98c50128c5702091d71.mockapi.io/api/v1/products', {
        title,
        price,
        image
    });
    return response.data;
})

// membuat function untuk delete
export const deleteProduct = createAsyncThunk("product/deleteProduct", async(id) => {
    await axios.delete(`https://625be98c50128c5702091d71.mockapi.io/api/v1/products/${id}`);
    return id;
})

// edit
export const updateProduct = createAsyncThunk("product/updateProduct", async({id, title, price, image}) => {
    const response = await axios.put(`https://625be98c50128c5702091d71.mockapi.io/api/v1/products/${id}`, {
        title,
        price,
        image
    });
    return response.data;
})

const productEntity = createEntityAdapter({
    selectId: (product) => product.id
})

// membuat slice :
const productSlice = createSlice({
    // nama slice
    name: "product",
    // initialState yang ingin dimulai empty string
    initialState: productEntity.getInitialState(),
    // reducer
    extraReducers: {
        //getProducts
       [getProducts.fulfilled] : (state, action) => {
           //kita dapat meng update statenya
           productEntity.setAll(state, action.payload)
           state.status = 'get product success';
       },
       [getProducts.pending] : (state, action) => {
        state.status = 'get product loading..';
        },

        // add product
       [saveProduct.fulfilled] : (state, action) => {
            productEntity.addOne(state, action.payload)
            state.status = 'add product success';
        },
        [saveProduct.pending] : (state, action) => {
            state.status = 'add product loading..';
        },

        // delete product
        [deleteProduct.fulfilled] : (state, action) => {
            productEntity.removeOne(state, action.payload)
            state.status = 'delete success';
        },
        [deleteProduct.pending] : (state, action) => {
            state.status = 'delete loading...';
        },

        // update product
        [updateProduct.fulfilled] : (state, action) => {
            productEntity.updateOne(state, {id: action.payload.id, updates: action.payload})
            state.status = 'update success';
        },
        [updateProduct.pending] : (state, action) => {
            state.status = 'update pending';
        }
    }
});


export const productSelectors = productEntity.getSelectors(state => state.product);
// export reducer agar dapat digunakan ke store
export default productSlice.reducer;
