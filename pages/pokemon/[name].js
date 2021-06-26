import { useRouter } from 'next/router'

import client from '../../apollo-client'
import { GET_POKEMONS, GET_POKEMONS_BY_ID } from '../../graphql/query'
import { getTime, capitalizeFirst } from '../../utils/helper'
import { useLocalStorage } from '../../hooks/hooks'

import Layout from '../../components/Layout'
import Button from '../../components/Button'

const PokemonDetails = ({ data }) => {
    // const router = useRouter()
    // const { name } = router.query
    // const { loading, error, data } = useQuery(GET_POKEMONS_BY_ID, {
    //     variables: { pokemonName: name },
    // })

    // if (loading) return 'Loading...'
    // if (error) return `Error! ${error.message}`
    const [owned, setOwned] = useLocalStorage("owned", "");
    let { pokemon } = data

    const handleClick = (currentPokemonName) => {
        console.log('catching pokemon~')
        let randomNumber = Math.floor(Math.random() * 10) // 0-9
        let nickname = 'nickname' + randomNumber
        let ownedPokemon = owned
        let pokemonData = {
            nickname,
            dateCaught: getTime(),
        }
        console.log(ownedPokemon)
        if (ownedPokemon !== null) {
            if (
                ownedPokemon.find(
                    (item) => item.pokemonName == currentPokemonName
                )
            ) {
                let currentIndex = ownedPokemon.findIndex(
                    (item) => item.pokemonName == currentPokemonName
                )
                //pokemon already exist, push nickname to owned tree
                ownedPokemon[currentIndex].owned.push(pokemonData)
                console.log('pokemon already exist')
            } else {
                //new pokemon, push whole object to owned tree
                ownedPokemon = [
                    ...ownedPokemon,
                    {
                        pokemonName: currentPokemonName,
                        owned: [pokemonData],
                    },
                ]
                console.log('new pokemon caught')
            }
        } else {
            console.log('initial caught')
            ownedPokemon = [
                {
                    pokemonName: currentPokemonName,
                    owned: [pokemonData],
                },
            ]
        }

        // console.log(obj)
        //TODO:
        //show modal catching pokemon

        if (randomNumber >= 5) {
            //0-4 lose, 5-9 win
            //change modal to pokemon caught, add input for nickname
            setOwned(ownedPokemon)
            console.log('pokemon caught!`')
        } else {
            console.log('pokemon got away')
        }
    }
    // console.log(pokemon)
    return (
        <>
            <Layout>
                <div className="pokemon-container center">
                    <div className="justify-center">
                        <img
                            className="pokemon-image"
                            src={pokemon.sprites.front_default}
                        />
                    </div>
                    <div className="pokemon-attr">
                        <div>Name: {pokemon.name}</div>
                        <div>Base EXP: {pokemon.base_experience}</div>
                        <div>Height: {pokemon.height}</div>
                        <div>Weight: {pokemon.weight}</div>
                        <div>
                            Abilities:
                            {pokemon.abilities.map((item) => (
                                <div>{item.ability.name}</div>
                            ))}
                        </div>
                        <div>
                            Stats:
                            {pokemon.stats.map((item) => (
                                <div>
                                    <div>{item.stat.name}</div>
                                    <div>{item.base_stat}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="catch-button">
                        <Button handleClick={() => handleClick(pokemon.name)}>
                            Catch this pokemon
                        </Button>
                    </div>
                </div>
                <style jsx>{`
                    .pokemon-container {
                        display: flex;
                        flex-direction: column;
                    }
                    .pokemon-image {
                        width: 250px;
                        height: 250px;
                    }
                    .catch-button {
                        position: fixed;
                        bottom: 2rem;
                    }
                `}</style>
            </Layout>
        </>
    )
}
const gqlVariables = {
    limit: 18,
    offset: 0,
}

export async function getStaticProps({ params }) {
    const { name } = params
    const { data } = await client.query({
        query: GET_POKEMONS_BY_ID,
        variables: {
            pokemonName: name,
        },
    })
    console.log(data)

    return {
        props: {
            data: data,
        },
    }
}

export async function getStaticPaths() {
    const { data } = await client.query({
        query: GET_POKEMONS,
        variables: gqlVariables,
    })

    const paths = data.pokemons.results.map((item) => {
        return {
            params: {
                name: item.name,
            },
        }
    })

    return { paths, fallback: 'blocking' }
}

export default PokemonDetails
