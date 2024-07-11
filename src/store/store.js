// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './usersSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
