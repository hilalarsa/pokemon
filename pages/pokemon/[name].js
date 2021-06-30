import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import client from '../../apollo-client'

import { GET_POKEMONS, GET_POKEMONS_BY_ID } from '../../graphql/query'
import { getTime, capitalizeFirst, randomizer } from '../../utils/helper'
import { useLocalStorage } from '../../hooks/useLocalStorage'

import Layout from '../../components/elements/Layout'
import Button from '../../components/elements/Button'
import Loading from '../../components/elements/Loading'
import LoadableImage from '../../components/elements/LoadableImage'

import PokemonInfo from '../../components/modules/PokemonInfo'
import PokemonMoves from '../../components/modules/PokemonMoves'
import PokemonStats from '../../components/modules/PokemonStats'

const PokemonDetails = ({ data }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [countdown, setCountdown] = useState(3)
    const [isPokemonCaught, setPokemonCaught] = useState(false)
    // const [buttonState, setButtonState] = useState("initial") // initial, catching, success, failed, nickname, save, duplicate
    const [buttonCatchText, setButtonCatchText] = useState('catch this pokemon')
    const [nickname, setNickname] = useState('')
    const [owned, setOwned] = useLocalStorage('owned', '')

    let { pokemon } = data

    useEffect(() => {
        let interval = null
        if (isLoading) {
            //initial state
            if (countdown > 0) {
                interval = setInterval(() => {
                    setCountdown((countdown) => countdown - 1)
                }, 1000)
            } else {
                clearInterval(interval)
            }
        }
        return () => clearInterval(interval)
    }, [
        countdown,
        isLoading,
        isPokemonCaught,
        owned,
        nickname,
        buttonCatchText,
    ])

    const handleClick = () => {
        console.log('catching pokemon~')
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            catchPokemon()
        }, 3000)
    }

    const catchPokemon = () => {
        let isPokemonCaught = randomizer() // 50% chance of true
        if (isPokemonCaught) {
            console.log('Pokemon caught')
            setButtonCatchText('Pokemon caught!')
            setTimeout(() => {
                setPokemonCaught(true)
                setButtonCatchText('Add nickname')
            }, 3000)
        } else {
            console.log('Pokemon got away')
            setButtonCatchText('Pokemon got away!')
            setTimeout(() => {
                setButtonCatchText('catch this pokemon')
                setCountdown(3)
                setPokemonCaught(false)
            }, 3000)
        }
    }

    const handleSubmitNickname = () => {
        let ownedPokemon = owned
        let currentPokemonName = pokemon.name
        let pokemonData = {
            nickname,
            dateCaught: getTime(),
        }

        //TODO:
        //show modal catching pokemon
        //start saving logic
        if (ownedPokemon != '' && ownedPokemon !== null) {
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
                    setButtonCatchText('duplicate nickname')
                    setTimeout(() => {
                        setButtonCatchText('Add nickname')
                    }, 1000)
                    //TODO: add validation on modal
                } else {
                    console.log('nickname saved')
                    ownedPokemon[currentIndex].owned.push(pokemonData)
                    finishSavingPokemon(ownedPokemon)
                }
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
                finishSavingPokemon(ownedPokemon)
            }
        } else {
            //new pokemon, owned tree is empty
            ownedPokemon = [
                {
                    pokemonName: currentPokemonName,
                    owned: [pokemonData],
                },
            ]
            console.log('initial caught')
            finishSavingPokemon(ownedPokemon)
        }
    }

    const finishSavingPokemon = (ownedPokemon) => {
        console.log('finish!')
        console.log(ownedPokemon)
        setButtonCatchText('save success')
        setTimeout(() => {
            setOwned((prevState) => {
                console.log(prevState)
                console.log(ownedPokemon)
                return [...ownedPokemon]
            })
            setCountdown(3)
            setPokemonCaught(false)
            setButtonCatchText('catch this pokemon')
        }, 3000)
    }

    return (
        <>
            <Layout>
                <div className="container">
                    <div className="image-container zoomhover pointer">
                        <div
                            className={`image-container-load ${
                                isLoading ? 'pulse' : ''
                            }`}
                        >
                            <Image
                                src={pokemon.sprites.front_default}
                                width={250}
                                height={250}
                                alt="Detail Pokemon"
                            />
                        </div>
                        <div className="pokemon-name pixeltext">
                            {capitalizeFirst(pokemon.name)}
                        </div>
                    </div>
                </div>

                <div className="container">
                    {isPokemonCaught ? (
                        <div className="pokemon-nickname-container">
                            <Button
                                disabled={buttonCatchText == 'save success'}
                                handleClick={() => handleSubmitNickname()}
                            >
                                <div className="button-content">
                                    {buttonCatchText} {/*Save Nickname*/}
                                </div>
                            </Button>

                            <input
                                type="text"
                                className="pokemon-nickname-input"
                                placeholder="Give it a nickname!"
                                onChange={(e) => setNickname(e.target.value)}
                            ></input>
                        </div>
                    ) : isLoading ? (
                        <Button disabled={true}>
                            <div className="button-content">
                                {/*Catch Countdown*/}
                                <Loading text={`Catching ${countdown}`} />
                            </div>
                        </Button>
                    ) : buttonCatchText == 'catch this pokemon' ? (
                        <Button handleClick={() => handleClick(pokemon.name)}>
                            <div
                                className="fab-button-content"
                                style={{ color: 'orange' }}
                            >
                                {buttonCatchText}
                            </div>
                        </Button>
                    ) : (
                        <div className="false-button">
                            <div className="button-content">
                                {/*Catch this pokemon, initial, Pokemon got away*/}
                                {buttonCatchText}
                            </div>
                        </div>
                    )}
                </div>

                <PokemonInfo pokemon={pokemon} />
                <PokemonMoves pokemon={pokemon} />
                <PokemonStats pokemon={pokemon} />

                <style jsx>{`
                    .container {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    .column {
                        flex: 50%;
                    }
                    .info-border {
                        display: flex;
                        align-items: start;
                        margin: 0 24px;
                        padding: 24px;
                        border: 2px solid #fdfffc;
                        border-radius: 2%;
                    }
                    .info-margin {
                        margin-top: 36px;
                    }
                    .info-text {
                        position: relative;
                        top: 12px;
                        background-color: #2ec4b6;
                        width: 40%;
                    }
                    .image-container {
                        background-color: #fdfffc;
                        border-color: #011627;
                        border: 4px solid #2ec4b6;
                        border-radius: 10%;
                        margin-top: 12px;
                    }
                    .image-container-load {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 250px;
                        height: 250px;
                    }
                    .image-container:active {
                        background: #e71d36;
                        color: #ffffff;
                    }
                    .pokemon-name {
                        color: #5386e4;
                        position: relative;
                        text-align: center;
                        top: -24px;
                        font-size: 1.2rem;
                    }
                    .pokemon-name:active {
                        color: white;
                    }
                    .catch-button {
                        text-align: center;
                        background-color: #fdfffc;
                    }
                    .button-content {
                        width: 200px;
                        height: 100%;
                        text-align: center;
                    }
                    .false-button {
                        justify-content: center;
                        border: medium none;
                        text-transform: uppercase;
                        outline: currentcolor none medium;
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 1.5;
                        padding: 5px 20px;
                        background-color: rgb(255, 242, 64);
                    }

                    .pokemon-nickname-input {
                        box-sizing: border-box;
                        display: block;
                        width: 100%;
                        border: 3px solid rgb(255, 242, 64);
                        padding: 0.5rem;
                        color: currentColor;
                        border-radius: var(--size-radius);
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
