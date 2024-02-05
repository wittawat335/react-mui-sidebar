import { IUser } from "@/types/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserState = {
  user: IUser | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
