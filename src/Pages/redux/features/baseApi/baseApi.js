import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


//create baseApi slice
export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery
    ({ 
        baseUrl: "https://bca7-115-127-156-9.ngrok-free.app/" ,
        
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                
                headers.set("Authorization", `Bearer ${token}`);
            }
            headers.set("ngrok-skip-browser-warning", "true"); 
            headers.set("Content-Type", "application/json");
            return headers;
            
        },
        tagtypes: ["User", "Terms"],
         }),
         

         endpoints: (builder) => ({

            //userlogin
            userLogin: builder.mutation({
                query: (userData) => ({
                    url: "api/auth/login",
                    method: "POST",
                    body: userData,
                }),
            }),

            // getAllUsers
            getAllUsers: builder.query({
                query: () => "api/dashboard/users",
                method: "GET",
            }),

           //get single user
            getSingleUser: builder.query({
                query: (id) => `api/dashboard/user/${id}`,
                invalidatesTags: ["User"],
            }),

            

            //delete single user document
            deleteSingleUserDocument: builder.mutation({
                query: (id) => ({
                    url: `/api/dashboard/conversation/${id}`,
                    method: "DELETE",
                }),
                invalidatesTags: ["conversation"],
            }),

            //get all terms
            getTerms: builder.query({
                query: () => "api/policy/terms",
                providesTags: ["Terms"],
             
            }),

            //update terms
            updateTerms: builder.mutation({
                query: (data) => ({
                    url: "api/policy/terms",
                    method: "PUT",
                    body: data,
                }),
                invalidatesTags: ["Terms"],
            }),

            //get all privacy policy
            getPrivacyPolicy: builder.query({
                query: () => "api/policy/privacy",
                providesTags: ["PrivacyPolicy"],
            }),

            //update privacy policy
            updatePrivacyPolicy: builder.mutation({
                query: (data) => ({
                    url: "api/policy/privacy",
                    method: "PUT",
                    body: data,
                }),
                invalidatesTags: ["PrivacyPolicy"],
            }),








         })
})

export const {
    useGetTermsQuery,
    useUserLoginMutation,
    useGetAllUsersQuery,
    useGetSingleUserQuery,
    useDeleteSingleUserDocumentMutation,
    useUpdateTermsMutation,
    useGetPrivacyPolicyQuery,
    useUpdatePrivacyPolicyMutation,
}  = baseApi