import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',  //slices of a store where each slice contains different information
  initialState: {
    user: null,
  },
  reducers: {  //two actions that will affect the login page
    login: (state, action)=> {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;




// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectUser = (state) => state.user.user;  //we push information into user global store and to extract info from this store we need a selector

export default userSlice.reducer;