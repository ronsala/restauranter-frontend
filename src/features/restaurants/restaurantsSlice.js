// import { 
//   createSlice,
//   createEntityAdapter,
//   createAsyncThunk 
// } from '@reduxjs/toolkit';
// import { fetchRestaurants } from '../../containers/restaurantContainer/RestaurantContainer';

// // export const fetchRestaurants = createAsyncThunk(
// //   'restaurants/fetchRestaurants', 
// //   async () => {
// //     const restaurants = await fetch('http://localhost:3000/api/v1/restaurants')
// //     .then((res) => res.json());
// //     return restaurants
// //   }
// // )

// const restaurantsAdapter = createEntityAdapter({
//   selectId: (restaurant) => restaurant.id,
// })

// export const restaurantsSlice = createSlice({
//   name: 'restaurant',
//   initialState: restaurantsAdapter.getInitialState({
//     status: 'idle'
//   }),
//   reducers: {
//     setAllRestaurants: restaurantsAdapter.setAll
//   },
//   extraReducers: {
//     [fetchRestaurants.pending]: (state) => {
//       state.status = 'loading'
//       state.error = null
//     },
//     [fetchRestaurants.fulfilled]: (state, action) => {
//       state.status = 'succeeded'
//       restaurantsAdapter.setAll(state, action.payload.data)
//     },
//     [fetchRestaurants.rejected]: (state, action) => {
//       state.status = 'failed'
//       state.error = action.payload
//     },
//   },
// })

// export const {} = restaurantsSlice.actions;

// export const restaurantsSelectors = restaurantsAdapter.getSelectors(
//   (state) => state.restaurants
// )

// export default restaurantsSlice.reducer;