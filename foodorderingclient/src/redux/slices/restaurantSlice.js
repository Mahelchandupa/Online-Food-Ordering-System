import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import api from "../../services/api";
import StatusCode from "../../utils/StatusCode";

const initialState = {  
    restaurants: [],
    loading: false,
    error: null,
    status: StatusCode.IDEL,
    message: null,
}

//async thunk for fetch all restaurants
export const fetchResturants = createAsyncThunk('restaurants/fetchRestaurants', async (_, { isRejectedWithValue}) => {
    try {
       const response = await api.get('/restaurants')
       return response.data
    } catch (error) {
        return isRejectedWithValue(error.response.data)
    }
})

const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchResturants.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(fetchResturants.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.restaurants = action.payload.payload;
            state.status = StatusCode.SUCCESS;
          })
          .addCase(fetchResturants.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })
    }
})

export default restaurantSlice.reducer;