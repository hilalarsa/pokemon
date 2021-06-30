import { GET_IMAGE_BY_NAME } from '../../graphql/query'
import { useQuery, gql } from '@apollo/client'

import Image from "next/image"

import Accordion from '../Accordion'
import Button from '../Button'

const MyPokemonCard = ({ pokemonData, owned, setOwned }) => {
    const { data, loading, error } = useQuery(GET_IMAGE_BY_NAME, {
        variables: { pokemonName: pokemonData.pokemonName },
    })

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        console.error(error)
        return null
    }

    if (data) {
        const releasePokemon = (
            releasedPokemonName,
            releasedPokemonNickname
        ) => {
            let ownedPokemon = owned
            if (ownedPokemon != '' && ownedPokemon !== null) {
                if (
                    ownedPokemon.find(
                        (item) => item.pokemonName == releasedPokemonName
                    )
                ) {
                    let currentIndex = ownedPokemon.findIndex(
                        (item) => item.pokemonName == releasedPokemonName
                    )
                    // pokemon has duplicate nickname
                    if (
                        ownedPokemon[currentIndex].owned.find(
                            (item) => item.nickname == releasedPokemonNickname
                        )
                    ) {
                        let currentNicknameIndex = ownedPokemon[
                            currentIndex
                        ].owned.findIndex(
                            (item) => item.nickname == releasedPokemonNickname
                        )
                        ownedPokemon[currentIndex].owned.splice(
                            currentNicknameIndex,
                            1
                        )

                        if (ownedPokemon[currentIndex].owned.length == 0) {
                            // if owned is empty, remove pokemon alltogether
                            ownedPokemon.splice(currentIndex, 1)
                        }
                    }
                }
            }
            setOwned(ownedPokemon) // update pokemon list
        }

        if (data) {
            return (
                <>
                    <div className="card-container">
                        <Accordion
                            headerText={pokemonData.pokemonName}
                            ownedAmount={pokemonData.owned.length}
                        >
                            <div className="pokemon-image-container">
                                <Image
                                    src={data.pokemon.sprites.front_default}
                                    className="pokemon-image"
                                    alt="My Pokemon Detail"
                                />
                            </div>
                            <div className="pokemon-name pixeltext">
                                {pokemonData.pokemonName}
                            </div>
                            <div className="nickname-container normaltext">
                                {pokemonData.owned.map((own) => {
                                    return (
                                        <>
                                            <div className="flex nickname-info">
                                                <div>
                                                    <div>
                                                        Nickname: {own.nickname}
                                                    </div>
                                                    <div>
                                                        Caught on:{' '}
                                                        {own.dateCaught}
                                                    </div>
                                                </div>
                                                <Button
                                                    handleClick={() =>
                                                        releasePokemon(
                                                            pokemonData.pokemonName,
                                                            own.nickname
                                                        )
                                                    }
                                                >
                                                    Release
                                                </Button>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </Accordion>
                    </div>
                    <style jsx>
                        {`
                            .card-container {
                                display: flex;
                                flex-direction: column;
                                color: white;
                                border: 2px solid #fdfffc;
                                border-radius: 10px;
                                margin-bottom: 12px;
                            }

                            .pokemon-image-container {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                border-radius: 2px;
                                margin: 24px;
                            }
                            .pokemon-image-container > * {
                                background-color: #fdfffc;
                            }
                            .pokemon-image {
                                height: 100%;
                                width: 100%;
                                max-width: 175px;
                                max-height: 175px;
                                border-radius: 3%;
                            }

                            .pokemon-image:hover {
                                transform: rotateX(10deg) rotateY(10deg);
                                background-color: #ff9f1c;
                                color: #ffffff;
                                animation: pulse 1s infinite;
                            }

                            .pokemon-name {
                                text-transform: capitalize;
                                color: #5386e4;
                                justify-content: space-around;
                                text-align: center;
                                font-size: 16px;
                                margin: 12px;
                                margin-top: -48px;
                            }

                            .nickname-container {
                                display: flex;
                                flex-direction: column;
                                margin: 0 24px;
                                padding: 12px;
                                border-top: 2px solid #fdfffc;
                                border-bottom: 2px solid #fdfffc;
                                border-radius: 2%;
                                margin-bottom: 24px;
                                color: white;
                            }
                            .nickname-info {
                                justify-content: space-between;
                                margin: 6px 0;
                            }

                            @keyframes holoFlip {
                                from: {
                                    transform: rotateZ(0deg) rotateX(0deg)
                                        rotateY(0deg);
                                }
                                to: {
                                    transform: rotateZ(10deg) rotateX(10deg)
                                        rotateY(10deg);
                                }
                            }
                            @keyframes holoCard {
                                0%,
                                100% {
                                    transform: rotateZ(0deg) rotateX(0deg)
                                        rotateY(0deg);
                                }
                                33% {
                                    transform: rotateZ(-10deg) rotateX(20deg)
                                        rotateY(-12deg);
                                }
                                66% {
                                    transform: rotateZ(10deg) rotateX(-20deg)
                                        rotateY(12deg);
                                }
                            }
                        `}
                    </style>
                </>
            )
        }
    }
}

export default MyPokemonCard
