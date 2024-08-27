import {createSlice} from "@reduxjs/toolkit";

interface IDeleteCommentState {
    status: 'idle' | 'pending' | 'success' | 'fail'
}
const initialState:IDeleteCommentState = {status: 'idle'};

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        del (state:IDeleteCommentState):void {
            state.status = 'pending';
        },
    },
    selectors: {
        isIdle: (state:IDeleteCommentState):boolean => state.status === 'idle',
    }
});