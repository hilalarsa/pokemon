import { useState } from 'react'
import { useRouter } from 'next/router'

import client from '../../apollo-client'
import { GET_POKEMONS, GET_POKEMONS_BY_ID } from '../../graphql/query'
import { getTime, capitalizeFirst, randomizer } from '../../utils/helper'
import { useLocalStorage } from '../../hooks/useLocalStorage'

import Layout from '../../components/Layout'
import Button from '../../components/Button'
import Loading from '../../components/Loading'

const PokemonDetails = ({ data }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [owned, setOwned] = useLocalStorage('owned', '')

    let { pokemon } = data

    const handleClick = (currentPokemonName) => {
        console.log('catching pokemon~')
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
        let isPokemonCaught = randomizer() // 50% chance of true
        if (isPokemonCaught) {
            console.log('Pokemon caught')
            let nickname = 'nickname' + Math.random()
            let ownedPokemon = owned
            let pokemonData = {
                nickname,
                dateCaught: getTime(),
            }

            //TODO:
            //show modal catching pokemon
            //start saving logic
            if (ownedPokemon !== null) {
                if (
                    ownedPokemon.find(
                        (item) => item.pokemonName == currentPokemonName
                    )
                ) {
                    //pokemon already exist, push nickname to owned tree
                    let currentIndex = ownedPokemon.findIndex(
                        (item) => item.pokemonName == currentPokemonName
                    )
                    // pokemon has duplicate nickname
                    if (
                        ownedPokemon[currentIndex].owned.find(
                            (item) => item.nickname == nickname
                        )
                    ) {
                        console.log(
                            'same pokemon with same nickname exist, assign different name'
                        )
                        //TODO: add validation on modal
                    } else {
                        ownedPokemon[currentIndex].owned.push(pokemonData)
                    }
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
                //new pokemon, owned tree is empty
                ownedPokemon = [
                    {
                        pokemonName: currentPokemonName,
                        owned: [pokemonData],
                    },
                ]
            }

            setOwned(ownedPokemon)
        } else {
            console.log('Pokemon got away')
        }
    }

    // console.log(pokemon)
    return (
        <>
            <Layout>
                <div className="container">
                    <div className="image-container">
                        <img
                            className="pokemon-image"
                            src={pokemon.sprites.front_default}
                        />
                    </div>
                </div>
                <div className="info-container normaltext">
                    <table className="pokemon-attr" border={0}>
                        <tr>
                            <td>Name</td>
                            <td>{capitalizeFirst(pokemon.name)}</td>
                        </tr>
                        <tr>
                            <td>Base EXP</td>
                            <td>{pokemon.base_experience}</td>
                        </tr>
                        <tr>
                            <td>Height</td>
                            <td>{pokemon.height}</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>{pokemon.weight}</td>
                        </tr>
                        <tr>
                            <td>Ability</td>
                            <td>
                                {pokemon.abilities.map((item) => (
                                    <span className="pills">
                                        {capitalizeFirst(item.ability.name)}
                                    </span>
                                ))}
                            </td>
                        </tr>
                    </table>
                    <table>
                        {pokemon.stats.map((item) => {
                            return (
                                <tr className="">
                                    <td>{capitalizeFirst(item.stat.name)}</td>
                                    <td className="flex">
                                        {[
                                            ...Array(
                                                Math.floor(
                                                    parseInt(item.base_stat) /
                                                        10
                                                )
                                            ),
                                        ].map((e, i) => (
                                            <span className="bar"></span>
                                        ))}
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </div>

                <div className="catch-button">
                    <Button handleClick={() => handleClick(pokemon.name)}>
                        <div className="button-content">
                            {isLoading ? (
                                <Loading text={'Catching'} />
                            ) : (
                                'Catch this pokemon'
                            )}
                        </div>
                    </Button>
                </div>
                <style jsx>{`
                    .container {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    .info-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        background-color: #2ec4b6;
                        color: white;
                    }
                    .image-container {
                        justify-content: center;
                        align-items: center;
                    }
                    .pokemon-attr {
                    }
                    .pills {
                        background-color: #ddd;
                        border: none;
                        color: black;
                        padding: 6px 4px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        margin: 4px 2px;
                        cursor: pointer;
                        border-radius: 16px;
                    }
                    .bar {
                        background-color: #ff9f1c;
                        border-radius: 25%;
                        width: 20px;
                        height: 10px;
                        margin: 2px;
                    }
                    .pokemon-image {
                        width: 250px;
                        height: 250px;
                    }
                    .catch-button {
                        position: fixed;
                        bottom: 2rem;
                        left: 50%;

                        margin-top: -200px; /* Negative half of height. */
                        margin-left: -120px; /* Negative half of width. */
                    }
                    .button-content {
                        width: 200px;
                        height: 100%;
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
