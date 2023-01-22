import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  id: string;
  name: string;
};
type InitialState = {
  user: UserState | null;
};
const initialState: InitialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin(state, action: PayloadAction<UserState>) {
      state.user = action.payload;
    },
    signout(state) {
      console.log('sign out hit');
      state.user = null;
    },
  },
});

export const { signout, signin } = userSlice.actions;
export default userSlice.reducer;
