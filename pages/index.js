import Head from 'next/head'
import styles from '../styles/Home.module.css'

import client from '../apollo-client'
import { gql, useQuery } from '@apollo/client'

import Layout from '../components/Layout'
import PokemonCard from '../components/PokemonCard'

export default function Home() {
    const { loading, error, data } = useQuery(GET_POKEMONS, {
        variables: gqlVariables,
    })

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    return (
        <div>
            <Head>
                <title>Pokedex</title>
                <meta
                    name="description"
                    content="Pokedex, pokemon index for your adventure!"
                />
                <link rel="icon" href="/pokemon-icon.ico" />
            </Head>

            <Layout>
                <div>
                    <div className="flex">
                        <PokemonCard />
                        <PokemonCard />
                        <PokemonCard />
                        <PokemonCard />
                        <PokemonCard />
                        <PokemonCard />
                        <PokemonCard />
                        <PokemonCard />
                        <PokemonCard />
                        <PokemonCard />
                        <PokemonCard />
                        <PokemonCard />
                    </div>
                </div>
            </Layout>
            <style jsx>{`
                .flex {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .flex > * {
                    flex: 1 1 10em;
                }
            `}</style>
        </div>
    )
}

const GET_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            count
            next
            previous
            status
            message
            results {
                url
                name
                image
            }
        }
    }
`

const gqlVariables = {
    limit: 2,
    offset: 1,
}

// export async function getStaticProps() {
//     const { data } = await client.query({
//         query: GET_POKEMONS
//     })
//     console.log(data)

//     return {
//         props: {
//             data,
//         },
//     }
// }
