import {baseApi} from "../../redux/baseApi.ts";

export const commentsApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        deleteComment: create.mutation((() => {
            const token = localStorage.getItem('token');
            return { query: (arg) => ({
                    url: `/comments`,
                    method: 'DELETE',
                    params: {id: arg.id},
                    headers: {authorization: token}
                }),
                /*invalidatesTags: ["Comments"],*/}
        })()),
        getComments: create.query({
            query: (arg) => ({
                url: `/comments`,
                method: 'GET',
                params: {postId: arg.postId},
            }),
            providesTags: ["Comments"],
        }),

    }),
    overrideExisting: true,
});
export const {useGetCommentsQuery} = commentsApi