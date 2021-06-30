import styles from '../styles/Home.module.css'

import client from '../apollo-client'
import { GET_POKEMONS } from '../graphql/query'
import { useEffect, useState } from 'react'

import Layout from '../components/Layout'
import PokemonCard from '../components/PokemonCard'

import { useQuery, gql } from '@apollo/client'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Home({ data }) {
    const [owned, setOwned] = useLocalStorage('owned', [])
    // let gqlVariables = {
    //     limit: 18,
    //     offset: 0,
    // }
    // const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS, {
    //     variables: gqlVariables,
    // })

    // if (loading) return 'Loading...'
    // if (error) return `Error! ${error.message}`

    const loadMore = () => {
        const currentLength = data.pokemons.results.length
        fetchMore({
            variables: {
                limit: 9,
                offset: 9,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                // const {data} = fetchMoreResult
                // console.log({...previousResult.pokemons.results, fetchMoreResult.pokemons.results})
                return {
                    ...previousResult.pokemons,
                    ...fetchMoreResult.pokemons,
                }
            },
        })
    }
    return (
        <div>
            <Layout>
                <div className="card-container">
                    {data.pokemons.results.map((item, key) => {
                        return (
                            <PokemonCard
                                key={key}
                                data={item}
                                ownedData={owned.filter((own) => {
                                    return own.pokemonName == item.name
                                })}
                            />
                        )
                    })}
                </div>
                {/* <div
                    className="loader text-center normaltext"
                    // onClick={loadMore}
                >
                    Load more
                </div> */}
            </Layout>
            <style jsx>{`
                .card-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
                }
                .loader {
                    margin-top: 12px;
                    color: white;
                    cursor: pointer;
                }
            `}</style>
        </div>
    )
}

const gqlVariables = {
    limit: 18,
    offset: 0,
}

export async function getStaticProps() {
    const { data } = await client.query({
        query: GET_POKEMONS,
        variables: gqlVariables,
    })

    return {
        props: {
            data,
        },
    }
}
