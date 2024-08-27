import {useLocation} from "react-router-dom";
import {useGetPostQuery} from "./postsApi.ts";
import Block from "../PostCommentBlock/Block.tsx";
import Comments from "../comments/Comments.tsx";
import Spinner from "../spinner/Spinner.tsx";

const Post = () => {
    /*$authHost.get('/test').then((data) => {
        console.log(data);
    })*/

    const location = useLocation();
    const postId = location.pathname.slice(1);
    const {data, isLoading} = useGetPostQuery({id: postId});
    if (isLoading) {
        return <Spinner/>
    }
    else {
        return (
            <div>
                <Block content={data} open={true}/>
                <Comments postId={postId}/>
            </div>
        );
    }
};

export {Post};