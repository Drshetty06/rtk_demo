import { createSlice } from '@reduxjs/toolkit';

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    page: 1,
    limit: 10,
  },
  reducers: {},
});

export const selectSales = (state) => state.sales.data;

export default salesSlice.reducer;
