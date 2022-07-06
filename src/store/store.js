import {configureStore} from "@reduxjs/toolkit";
import usersSlice from "../features/users/usersSlice";
import userSlice from "../features/user/userSlice";

export const store = configureStore({
    reducer: {
        users: usersSlice,
        user: userSlice,
    },
})