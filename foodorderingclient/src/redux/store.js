import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import restaurantSlice from "./slices/restaurantSlice";

const store = configureStore({
    reducer: {
       auth: authSlice,
       restaurants: restaurantSlice
    }
})

export default store;