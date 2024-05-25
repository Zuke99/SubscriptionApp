import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/SignupSlice'
import UploadSlice from "./slice/UploadSlice";
import PaymentSlice from "./slice/PaymentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    uploadPost: UploadSlice,
    payment: PaymentSlice
  },
});

export default store;
