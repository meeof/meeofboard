import {checkAuthFun} from "./checkAuth.ts";
import {createSlice} from "../../redux/redux.ts";
import {Draft} from "@reduxjs/toolkit";

interface IUserState {
    auth: boolean,
    status: 'idle' | 'pending' | 'success' | 'fail'
}

const initialState:IUserState = { auth: false, status: "idle" };

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: (creators) => ({
        /*userAuth: creators.asyncThunk<IUserState, {}, {extra:ExtraArgument}>(async (params, thunkAPI) => {
            const {data} = await thunkAPI.extra.$authHost.get('/user/auth');
            localStorage.setItem('token', data);
            return data
        }, {
            pending (state) {
                state.auth = true;
                state.status = 'success'
            },
            fulfilled (state) {
                state.auth = true;
                state.status = 'success'
            },
            rejected (state) {
                state.auth = false;
                state.status = 'fail'
            }
        })*/
        /*checkAuth(state) {
            state.status = 'pending'
        },
        isAuth(state) {
            state.auth = true;
            state.status = 'success'
        },
        notAuth(state) {
            state.auth = false;
            state.status = 'fail'
        },*/
    }),
    extraReducers: builder => {
        builder.addCase(checkAuthFun.pending, (state:Draft<IUserState>) => {
            state.status = 'pending'
        });
        builder.addCase(checkAuthFun.fulfilled, (state:Draft<IUserState>) => {
            state.auth = true;
            state.status = 'success'
        });
        builder.addCase(checkAuthFun.rejected, (state:Draft<IUserState>) => {
            state.auth = false;
            state.status = "fail"
        })
    },
    selectors: {
        auth: (state:IUserState) => state.auth,
        isIdle: (state:IUserState) => state.status === 'idle',
    },
});

export const {checkAuth, notAuth, isAuth, userAuth} = userSlice.actions;
export const {auth} = userSlice.selectors;