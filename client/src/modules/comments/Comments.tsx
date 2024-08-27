import Block from "../PostCommentBlock/Block.tsx";
import {useGetCommentsQuery} from "./commentsApi.ts";
import Spinner from "../spinner/Spinner.tsx";
import {useAppDispatch} from "../../redux/redux.ts";
import {delComment} from "./delComment.ts";
interface ICommentsProps {
    postId: string
}
const Comments = ({postId}:ICommentsProps) => {
    const {data, isLoading} = useGetCommentsQuery({postId});
    const dispatch = useAppDispatch();
    const delFun = (id:number) => {
        dispatch(delComment(id))
    }
    if (isLoading) {
        return <Spinner/>
    }
    else {
        return data.map(comment => <Block content={comment} open={true} comment={true} key={comment.id} delFun={delFun}/>)
    }
};

export default Comments;