import { IUser } from "@/types/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserState = {
  users: IUser[];
};
const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    // deleteUser: (state, action: PayloadAction<string>) => {
    //   state.users = state.users.filter(
    //     (item: string) => item.id !== action.payload
    //   );
    // },
    // deleteUser: (state, action: PayloadAction<string>) =>
    //   (state.users = state.users.filter((item) => item.id !== action.payload)),
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
