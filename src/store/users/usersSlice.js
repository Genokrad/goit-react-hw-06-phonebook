import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  filteredUsers: '',
};

export const usresSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    deleteUsers: (state, action) => {
      state.users = state.users.filter(
        contact => contact.id !== action.payload
      );
    },
    setFilter: (state, action) => {
      state.filteredUsers = action.payload;
    },
  },
});

export const { setUsers, deleteUsers, setFilter } = usresSlice.actions;
export default usresSlice.reducer;
