import {commentsApi} from "./commentsApi.ts";
import {AppDispatch, AppState, ExtraArgument} from "../../redux/redux.ts";

export const delComment = (id:number) => (dispatch:AppDispatch, getState:AppState, extra:ExtraArgument) => {
    dispatch(commentsApi.endpoints.deleteComment.initiate({id})).then(({data}) =>{
        if (data === 'deleted') {
            extra.router.navigate('/');
            dispatch(commentsApi.util.invalidateTags(['Comments']))
        }
    })
    /*const idle = commentsSlice.selectors.isIdle(getState());
    dispatch(commentsSlice.actions.del());
    if (idle) {
        extra.$authHost.delete('/comments', {params: {id}}).
        then(() => {
            extra.router.navigate('/')
        }).catch(err => console.log(err))
    }*/
}