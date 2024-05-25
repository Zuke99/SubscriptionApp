import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL ="http://localhost:6001/post/";

export const uploadPost = createAsyncThunk("uploadPost", async (data, {rejectWithValue}) => {
    try{
        const response = await axios.post(API_URL + "upload-post", data);
        if(response.data.status === "success") {
            return response.data;
        } else {
            return rejectWithValue(response.data.message);
        }
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});



export const getPost = createAsyncThunk("getPost", async (_, {rejectWithValue}) => {
    try{
        const response = await axios.get(API_URL + "get-posts");
        if(response.data.status === "success") {
            return response.data;
        } else {
            return rejectWithValue(response.data.message);
        }
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});



const initialState = {
    loading: false,
    error: false,
    success: false,
    message: "",
    data: null
}

const uploadPostSlice = createSlice({
    name: "postUpload",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(uploadPost.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(uploadPost.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.message = action.payload.message;
            state.success = true;
        })
        builder.addCase(uploadPost.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action?.payload?.message;
        });

        builder.addCase(getPost.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getPost.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data.data;
            state.message = action.payload.message;
            state.success = true;
        })
        builder.addCase(getPost.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action?.payload?.message;
        });

    }
})

export default uploadPostSlice.reducer;