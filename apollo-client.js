import { ApolloClient, InMemoryCache } from '@apollo/client'
import { offsetLimitPagination } from '@apollo/client/utilities'

const client = new ApolloClient({
    uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
    cache: new InMemoryCache(),
    // cache: new InMemoryCache({
    //     typePolicies: {
    //         Query: {
    //             fields: {
    //                 // pokemons: {
    //                 //     ...offsetLimitPagination(),
    //                 //     read(existing, { args }) {
    //                 //         console.log(existing)
    //                 //     },
    //                 // },
    //                 pokemons: {
    //                     keyArgs: false,
    //                     merge(existing = [], incoming) {
    //                         return [...existing, ...incoming]
    //                     },
    //                     read(existing, { args }) {
    //                         console.log('read')
    //                         console.log(existing)
    //                         return []
    //                     },
    //                 },
    //             },
    //         },
    //     },
    // }),
})

export default client
