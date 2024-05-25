import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:6001/payment/"

export const getSecretKey = createAsyncThunk("getKey", async(_, {rejectWithValue}) => {
    try{
        const response = await axios.get(API_URL + 'get-key');
        if(response.data.status === "success") {
            return response.data;
        } else {
            return rejectWithValue(response.data.message);
        }
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const createPayment = createAsyncThunk("getKey", async(data, {rejectWithValue}) => {
    try{
        const response = await axios.post(API_URL + 'create-payment', data);
        if(response.data.status === "success") {
            return response.data;
        } else {
            return rejectWithValue(response.data.message);
        }
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const verifyPayment = createAsyncThunk("getKey", async(data, {rejectWithValue}) => {
    try{
        const response = await axios.post(API_URL + 'payment-verification', data);
        if(response.data.status === "success") {
            return response.data;
        } else {
            return rejectWithValue(response.data.message);
        }
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const initialState = {
    loading: false,
    key: "",
    userToken: null,
    error: false,
    success: false,
    message: ""
}

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getSecretKey.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getSecretKey.fulfilled, (state, action) => {
            state.loading = false;
            state.key = action.payload.data;
            state.message = action.payload.message;
            state.success = true;
        })
        builder.addCase(getSecretKey.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action?.payload?.message;
        });


        // builder.addCase(createPayment.pending, (state) => {
        //     state.loading = true;
        // })
        // builder.addCase(createPayment.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.key = action.payload.data;
        //     state.message = action.payload.message;
        //     state.success = true;
        // })
        // builder.addCase(createPayment.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = true;
        //     state.message = action?.payload?.message;
        // });
    }
})

export default paymentSlice.reducer