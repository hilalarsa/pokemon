import styles from '../styles/Home.module.css'

import client from '../apollo-client'
import { GET_POKEMONS } from '../graphql/query'

import Layout from '../components/Layout'
import PokemonCard from '../components/PokemonCard'

export default function Home({ data }) {
    // const { loading, error, data } = useQuery(GET_POKEMONS, {
    //     variables: gqlVariables,
    // })

    // if (loading) return 'Loading...'
    // if (error) return `Error! ${error.message}`

    return (
        <div>
            <Layout>
                <div className="card-container">
                    {data.pokemons.results.map((item) => {
                        return <PokemonCard data={item} />
                    })}
                </div>
            </Layout>
            <style jsx>{`
                .card-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
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
