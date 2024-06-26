import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:6001/user/"
export const registerUser = createAsyncThunk("registerUser", async (data, {rejectWithValue}) => {
    try{
        const response = await axios.post(API_URL + "register", data);
        if(response.data.status === "success") {
            return response.data;
        } else {
            return rejectWithValue(response.data.message);
        }
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const loginUser = createAsyncThunk("loginUser", async (data, {rejectWithValue}) => {
    try{
        const response = await axios.post(API_URL + "login", data);
        if(response.data.status === "success") {
            return response.data;
        } else {
            return rejectWithValue(response.data.message);
        }
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getUser = createAsyncThunk("loginUser", async (data, {rejectWithValue}) => {
    try{
        const response = await axios.post(API_URL + "get-user", data);
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
    userInfo: {},
    userToken: null,
    error: false,
    success: false,
    registerMessage: ""
}

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload.data;
            state.registerMessage = action.payload.message;
            state.success = true;
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.registerMessage = action?.payload?.message;
        });

        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload.data;
            state.registerMessage = action.payload.message;
            state.success = true;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.registerMessage = action?.payload?.message;
        });
    }
})

export default userAuthSlice.reducer