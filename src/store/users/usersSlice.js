import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
  },
  reducers: {
    addAction: (state, { payload }) => {
      state.users.push(payload);
    },
    deleteAction: (state, { payload }) => {
      state.users = state.users.filter(user => user.id !== payload);
    },
    changeStatusUser: (state, { payload }) => {
      state.users = state.users.map(user => {
        const status = user.status === 'online' ? 'offline' : 'online';
        return user.id === payload ? { ...user, status } : user;
      });
    },
  },
});

export const { addAction, deleteAction, changeStatusUser } = userSlice.actions;
export default userSlice.reducer;
