import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import favReducer from "../features/favs/favsSlice";
import loginReducer from "../features/login/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    users: userReducer,
    favs: favReducer,
  },
});
