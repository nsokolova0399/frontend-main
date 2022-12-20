// import Vue from 'vue'
// import VueApollo from 'vue-apollo'
// // import { ApolloLink } from 'apollo-link'
// import { ApolloClient } from 'apollo-client'
// import { HttpLink } from 'apollo-link-http'
// import { setContext } from 'apollo-link-context'
// // import {onError} from 'apollo-link-error'
// // import { REFRESHTOKEN_MUTATION } from "./mutations";
// import { InMemoryCache } from 'apollo-cache-inmemory'
// // import router from './router/index';
// Vue.use(VueApollo);
//
// const httpLink = new HttpLink({uri: 'http://127.0.0.1:8000/api/graphql/'})
// // const token = 'token'
//
//
// // function getNewToken() {
// //     const refreshToken = localStorage.getItem('refreshToken');
// //     return apolloClient.mutate({
// //         mutation: REFRESHTOKEN_MUTATION,
// //         variables: {
// //             refreshToken
// //         },
// //     }).then((response) => {
// //         console.log(response)
// //         localStorage.setItem("token",response.data.refreshToken.token)
// //         localStorage.setItem("refreshToken",response.data.refreshToken.refreshToken)
// //         return response.data.refreshToken.token;
// //     })
// // }
//
// // const errorlink = onError(
// //     ({ graphQLErrors, networkError, operation, forward }) => {
// //         if (graphQLErrors) {
// //             for (let err of graphQLErrors) {
// //                 switch (err.extensions.code) {
// //                     case "UNAUTHENTICATED":
// //                         return fromPromise(
// //                             getNewToken().catch(() => {
// //                                 localStorage.removeItem("token");
// //                                 localStorage.removeItem("refreshToken");
// //                                 return router.replace('/Home');
// //                             })
// //                         )
// //                             .filter((value) => Boolean(value))
// //                             .flatMap((token) => {
// //                                 console.log(token)
// //                                 operation.setContext({
// //                                     headers: {
// //                                         Authorization: token ? `JWT ${token}` : '',
// //                                     },
// //                                 });
// //                                 return forward(operation);
// //                             });
// //                 }
// //             }
// //         }
// //         if (networkError) console.log(`[Network error]: ${networkError}`);
// //
// //     }
// // );
// const authLink = setContext(async(_, { headers }) => {
//     const token = localStorage.getItem('token')
//     return {
//
//         headers: {
//             ...headers,
//             authorization: token ? `JWT ${token}` : "",
//         }
//     }
// });
//
//
//
// export const config = {
//     link: authLink.concat(httpLink),
// }
//
// const apolloClient = new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache: new InMemoryCache(),
//     defaultOptions: {
//         watchQuery: {
//             fetchPolicy: 'cache-and-network',
//         },
//     },
// })
//
// export const createProvider = new VueApollo({
//     defaultClient: apolloClient,
// })
