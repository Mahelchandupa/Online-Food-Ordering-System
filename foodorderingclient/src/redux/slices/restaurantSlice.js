import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import api from "../../services/api";
import StatusCode from "../../utils/StatusCode";

const initialState = {  
    restaurants: [],
    loading: false,
    error: null,
    status: StatusCode.IDEL,
    message: null,
    restaurant: null,
    userRestaurant: null,
    events: [],
    restaurantEvents: [],
    catergory: [],
}

//async thunk for fetch all restaurants
export const fetchResturants = createAsyncThunk('restaurants/fetchRestaurants', async (_, { isRejectedWithValue }) => {
    try {
       const response = await api.get('/restaurants')
       return response.data
    } catch (error) {
        return isRejectedWithValue(error.response.data)
    }
})

//async thunk for fetch resturant by id
export const fetchRestaurantById = createAsyncThunk('restaurants/fetchRestaurantById', async (restaurantId, { isRejectedWithValue }) => {
  try {
     const response = await api.get(`/restaurants/${restaurantId}`)
     return response.data
  } catch (error) {
    return isRejectedWithValue(error.response.data)
  }
})

//async thunk for create restaurant
export const createRestant = createAsyncThunk('restaurants/createRestaurant', async (restaurant, { isRejectedWithValue }) => {
  try {
     const response = await api.post('/admin/restaurants', restaurant)
     return response.data
  } catch (error) {
    return isRejectedWithValue(error.response.data)
  }
})

//async thunk for update restaurant
export const updateRestaurant = createAsyncThunk('restaurants/updateRestaurant', async (restaurant, { isRejectedWithValue}) => {
  try {
    const response = api.put(`/admin/restaurants/${restaurant.id}`, restaurant)
    return response.data
  } catch (error) {
    return isRejectedWithValue(error.response.data)
  }
})

//async thunk for delete restaurant
export const deleteRestaurant = createAsyncThunk('restaurants/deleteRestaurant', async (restaurantId, { isRejectedWithValue }) => {
  try {
    const response = api.delete(`/admin/restaurants/${restaurantId}`)
    return response.data
  } catch (error) {
    return isRejectedWithValue(error.response.data) 
  }
})

//async thunk for update restaurant status
export const updateRestaurantStatus = createAsyncThunk('restaurants/updateRestaurantStatus', async (restaurantId, { isRejectedWithValue }) => {
  try {
    const response = api.put(`/admin/restaurants/${restaurantId}/status`)
    return response.data
  } catch (error) {
    return isRejectedWithValue(error.response.data)
  }
})

//async thunk for get list of restaurant by keywords
export const searchRestaurants = createAsyncThunk('restaurants/searchRestaurants', async (keyword, { isRejectedWithValue }) => {
  try {
    const response = api.get(`/restaurants/search?keyword=${keyword}`)
    return response.data
  } catch (error) {
    return isRejectedWithValue(error.response.data)
  }
})



//async thunk for create category
export const createCategory = createAsyncThunk('restaurants/createCategory', async (category, { isRejectedWithValue}) => {
  try {
    const response = api.post('/admin/category', category)
    return response.data
  } catch (error) {
    return isRejectedWithValue(error.response.data)
  
  }
})

//async thunk for get restaurant category
export const getRestaurantCategory = createAsyncThunk('restaurants/getRestaurantCategory', async (restaurantId, { isRejectedWithValue }) => {
  try {
    const response = api.get(`/category/restaurant/${restaurantId}`)
    return response.data
  } catch (error) {
    return isRejectedWithValue(error.response.data)
  }
})

//async thunk for create restaurant events
export const createRestaurantEvents = createAsyncThunk('restaurants/createRestaurantEvents', async (events, { isRejectedWithValue }) => {
  try {
    const response = api.post('/admin/events', events)
    return response.data
  } catch (error) {
    return isRejectedWithValue(error.response.data)
  }
})

//async thunk for get restaurant events
export const getRestaurantEvents = createAsyncThunk('restaurants/getRestaurantEvents', async (restaurantId, { isRejectedWithValue }) => {
  try {
    const response = api.get(`/events/restaurant/${restaurantId}`)
    return response.data
  } catch (error) {
    return isRejectedWithValue(error.response.data)
  }
})

//async thunk for get restaurant events by id
export const getRestaurantEventsById = createAsyncThunk('restaurants/getRestaurantEventsById', async (eventId, { isRejectedWithValue }) => {
  try {
    const response = api.get(`/events/${eventId}`)
    return response.data
  } catch (error) {
    return isRejectedWithValue(error.response.data)
  }
})

//async thunk for delete restaurant events
export const deleteRestaurantEvents = createAsyncThunk('restaurants/deleteRestaurantEvents', async (eventId, { isRejectedWithValue }) => {
  try {
    const response = api.delete(`/admin/events/${eventId}`)
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
          //fetch all restaurants
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
        
          //fetch restaurant by id
          .addCase(fetchRestaurantById.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(fetchRestaurantById.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.restaurant = action.payload.payload;
            state.status = StatusCode.SUCCESS;
          })
          .addCase(fetchRestaurantById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })

          //create restaurant
          .addCase(createRestant.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(createRestant.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.userRestaurant = action.payload.payload;
            state.status = StatusCode.SUCCESS;
          })
          .addCase(createRestant.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })

          //update restaurant
          .addCase(updateRestaurant.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(updateRestaurant.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.status = StatusCode.SUCCESS;
          })
          .addCase(updateRestaurant.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })

          //delete restaurant
          .addCase(deleteRestaurant.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(deleteRestaurant.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.status = StatusCode.SUCCESS;
          })
          .addCase(deleteRestaurant.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })

          //update restaurant status
          .addCase(updateRestaurantStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(updateRestaurantStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.status = StatusCode.SUCCESS;
          })
          .addCase(updateRestaurantStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          }) 

          //search restaurants
          .addCase(searchRestaurants.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(searchRestaurants.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.restaurants = action.payload.payload;
            state.status = StatusCode.SUCCESS;
          })
          .addCase(searchRestaurants.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })
          
          //create category
          .addCase(createCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(createCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.catergory = [...state.catergory, action.payload.payload];
            state.status = StatusCode.SUCCESS;
          })
          .addCase(createCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })

          //get restaurant category
          .addCase(getRestaurantCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(getRestaurantCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.catergory = action.payload.payload;
            state.status = StatusCode.SUCCESS;
          })
          .addCase(getRestaurantCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })
          
          //create restaurant events
          .addCase(createRestaurantEvents.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(createRestaurantEvents.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.events = [...state.events, action.payload.payload];
            state.restaurantEvents = [...state.restaurantEvents, action.payload.payload];
            state.status = StatusCode.SUCCESS;
          })
          .addCase(createRestaurantEvents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })

          //get restaurant events
          .addCase(getRestaurantEvents.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(getRestaurantEvents.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.restaurantEvents = action.payload.payload;
            state.status = StatusCode.SUCCESS;
          })
          .addCase(getRestaurantEvents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })

          //delete restaurant events
          .addCase(deleteRestaurantEvents.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(deleteRestaurantEvents.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.events = state.events.filter(event => event.id !== action.payload)
            state.restaurantEvents = state.restaurantEvents.filter(event => event.id !== action.payload)  
            state.status = StatusCode.SUCCESS;
          })
          .addCase(deleteRestaurantEvents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })
    }
})

export default restaurantSlice.reducer;