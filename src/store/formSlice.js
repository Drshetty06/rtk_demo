
import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    name: '',
    submittedName: '',
  },
  reducers: {
    updateName(state, action) {
      state.name = action.payload;
    },
    submitName(state) {
      state.submittedName = state.name;
      state.name = '';
    },
  },
});

export const { updateName, submitName } = formSlice.actions;
export default formSlice.reducer;
