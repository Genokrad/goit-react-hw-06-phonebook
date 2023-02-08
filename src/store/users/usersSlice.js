import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      console.log(state);
      state.users.push(action.payload);
    },
    deleteUsers: (state, action) => {
      state.users = state.users.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

export const { setUsers, deleteUsers } = usersSlice.actions;
// export default usresSlice.reducer;
