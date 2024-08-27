import {baseApi} from "../../redux/baseApi.ts";

export const postsApi = baseApi.injectEndpoints( {
    endpoints: (create) => ({
        getPosts: create.query({
            query: () => '/posts',
            providesTags: ["Posts"],
        }),
        getPost: create.query({
            query: (arg) => `/posts/${arg.id}`,
            providesTags: ["Post"],
        }),
    }),
    overrideExisting: true,
});

export const {useGetPostsQuery, useGetPostQuery} = postsApi;
