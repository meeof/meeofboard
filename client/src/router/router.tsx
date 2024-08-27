import {createBrowserRouter} from "react-router-dom";
import {Posts} from "../modules/posts/Posts.tsx";
import App from "../App.tsx";
import {store} from "../redux/store.ts";
import {checkAuthFun} from "../modules/user/checkAuth.ts";
import {postsApi} from "../modules/posts/postsApi.ts";

const loadStore = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve(store), 0);
    });
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        loader: () => {
            loadStore().then(() => store.dispatch(checkAuthFun()))
            return null;
        },
        children: [
            {
                path: '/',
                element: <Posts/>,
                loader: () => {
                    loadStore().then(() => {
                        postsApi.endpoints.getPosts.initiate()
                        store.dispatch(postsApi.util.prefetch('getPosts', {}, {}))
                    });
                    return null
                },
                /*lazy: async () => {
                    const {Posts} = await import('../modules/posts/Posts.tsx');
                    return {
                        loader: () => {
                            loadStore().then(() => {
                                postsApi.endpoints.getPosts.initiate()
                                store.dispatch(postsApi.util.prefetch('getPosts', {}, {}))
                            });
                            return null
                        },
                        Component: Posts,
                    }
                }*/
        },
            {
                path: '/:id',
                lazy: async () => {
                    const {Post} = await import('../modules/posts/Post.tsx');
                    return {
                        loader: ({params}) => {
                            loadStore().then(() => {
                                store.dispatch(postsApi.util.prefetch('getPost', {id: params.id}, {}));
                            });
                            return null
                        },
                        Component: Post,
                    }
                }
            }
        ]
    },
])