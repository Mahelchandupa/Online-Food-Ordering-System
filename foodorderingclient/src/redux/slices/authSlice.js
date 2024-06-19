import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import StatusCode from "../../utils/StatusCode";
import api from "../../services/api";

//async thunk for registering a user
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/user/register', userData);
        const { jwt, email, userName, role } = response.data.payload;
        // localStorage.setItem('jwtToken', jwt);
        return { token: jwt, user: { email, userName, role }, message: response.data.message };
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

//async thunk for logging in a user
export const loginUser = createAsyncThunk('auth/loginuser', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/user/login', credentials, {
            headers: {
                'Content-Type': 'application/json'
            }

        });
        const { jwt, email, userName, role } = response.data.payload;
        localStorage.setItem('jwtToken', jwt);
        return { token: jwt, user: { email, userName, role }, message: response.data.message, };
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
//async thunk for fetching user profile
export const userProfile = createAsyncThunk('auth/userProfile', async (_, { isRejectedWithValue }) => {
    try {
        const response = await api.get('/user/profile')
        return response.data
    } catch (error) {
        return isRejectedWithValue(error.response.data)
    }
})

//async thunk for add to favorite
export const addToFavorite = createAsyncThunk('restaurants/addToFavorite', async (restaurantId, { isRejectedWithValue }) => {
    try {
        const response = await api.put(`/restaurants/${restaurantId}/add-favorites`)
        return response.data
    } catch (error) {
        return isRejectedWithValue(error.response.data)
    }
})

const initialState = {
    message: null,
    user: null,
    favorites: [],
    token: localStorage.getItem('jwtToken'),
    loading: false,
    error: null,
    status: StatusCode.IDEL
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('jwtToken');
        }
    },
    extraReducers: (builder) => {
        builder
            //regsiter user
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = StatusCode.LOADING;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.message = action.payload.message;
                state.token = action.payload.token;
                state.status = StatusCode.SUCCESS;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = StatusCode.ERROR;
            })

            //login user
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = StatusCode.LOADING;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.status = StatusCode.SUCCESS;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = StatusCode.ERROR;
            })

            //fetch user profile
            .addCase(userProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = StatusCode.LOADING;
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.payload;
                state.favorites = [...action.payload.payload.favorites]
                state.status = StatusCode.SUCCESS;
            })
            .addCase(userProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = StatusCode.ERROR;
            })

            //add to favorite
            .addCase(addToFavorite.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = StatusCode.LOADING;
            })
            .addCase(addToFavorite.fulfilled, (state, action) => {
                state.loading = false;
                state.message =  action.payload.message;

                const favorite = action.payload.payload;

                if (state.favorites.some(item => item.id === favorite.id)) {
                    // If the favorite is already in the list, remove it
                    state.favorites = state.favorites.filter(item => item.id !== favorite?.id);
                } else {
                    // If the favorite is not in the list, add it
                    state.favorites = [...state.favorites, favorite];
                }
                state.status = StatusCode.SUCCESS;
            })
            .addCase(addToFavorite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = StatusCode.ERROR;
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;