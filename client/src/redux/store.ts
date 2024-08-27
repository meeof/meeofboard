import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "../modules/user/userSlice.ts";
import {baseApi} from "./baseApi.ts";
import {commentsApi} from "../modules/comments/commentsApi.ts";
import {$authHost} from "../axios/hosts.ts";
import {commentsSlice} from "../modules/comments/commentsSlice.ts";
import {router} from "../router/router.tsx";
import {postsApi} from "../modules/posts/postsApi.ts";

export const extraArgument = {
    $authHost,
    router,
};

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer,
        [userSlice.reducerPath]: userSlice.reducer,
        [commentsSlice.reducerPath]: commentsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: { extraArgument } }).concat(baseApi.middleware),
});