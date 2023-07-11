
import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import usersReducer from './usersSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    users: usersReducer,
  },
});

export default store;
