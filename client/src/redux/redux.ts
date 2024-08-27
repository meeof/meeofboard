import {useDispatch, useSelector, useStore} from "react-redux";
import {extraArgument, store} from "./store.ts";
import {asyncThunkCreator, buildCreateSlice, createAsyncThunk} from "@reduxjs/toolkit";

export type AppState = any;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppState;
    dispatch: AppDispatch;
    extra: typeof extraArgument;
}>();


export const createSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});
export type ExtraArgument = typeof extraArgument;