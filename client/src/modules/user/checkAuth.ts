import {checkAuth, isAuth, notAuth, userSlice} from "./userSlice.ts";
import {createAppAsyncThunk} from "../../redux/redux.ts";
import {UnknownAction} from "@reduxjs/toolkit";

/*export const checkAuthFun = (dispatch, getState, extra) => {
    const idle = userSlice.selectors.isIdle(getState());
    dispatch(checkAuth());
    if (idle) {
        extra.$authHost.get('/user/auth').then(({data}) => {
            if (data === 'Unauthorized') {
                dispatch(notAuth())
                return
            }
            localStorage.setItem('token', data);
            dispatch(isAuth())
        }).catch((err) => {
            console.log(err);
            dispatch(notAuth())
        });
    }
}*/

export const checkAuthFun = createAppAsyncThunk(
    'user/authorization', async (_, thunkAPI) => {
        const {data} = await thunkAPI.extra.$authHost.get('/user/auth');
            localStorage.setItem('token', data);
            return data
    },
)



