import { configureStore } from '@reduxjs/toolkit';
import salesApi  from './salesApi';
import formReducer from './formSlice';
import usersReducer from './usersSlice';
import salesReducer from './salesSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    users: usersReducer,
    sales: salesReducer,
    [salesApi.reducerPath]: salesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(salesApi.middleware),
});

export default store;