import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredUsers: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filteredUsers = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
// export default filterSlice.reducer;
