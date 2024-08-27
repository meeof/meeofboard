import {useGetPostsQuery} from "./postsApi.ts";
import * as style from '../PostCommentBlock/Block.module.css'
import Block from "../PostCommentBlock/Block.tsx";
import Spinner from "../spinner/Spinner.tsx";
const Posts = () => {
    const {data, isLoading} = useGetPostsQuery();
    if (isLoading) {
        return <Spinner/>
    }
    else if (data) {
        return <div className={style.postsBox}>{
            data.map(post => {
                return <Block content={post} open={false} key={post.id}/>
            })
        }</div>
    }
};

export {Posts};