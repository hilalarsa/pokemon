import { GET_IMAGE_BY_NAME } from '../../graphql/query'
import { useQuery, gql } from '@apollo/client'

import Button from '../Button'

const MyPokemonCard = ({ pokemonData }) => {
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

    return (
        <>
            <div className="card-container">
                <div className="pokemon-image-container">
                    <img
                        src={data.pokemon.sprites.front_default}
                        className="pokemon-image"
                    />
                </div>
                <div className="">
                    <div className="pokemon-name">
                        {pokemonData.pokemonName}
                    </div>
                </div>
                <div>
                    {pokemonData.owned.map((own) => {
                        return (
                            <>
                                <div className="flex">
                                    <div>
                                        <div>Nickname: {own.nickname}</div>
                                        <div>Caught on: {own.dateCaught}</div>
                                    </div>
                                    <Button>Release</Button>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            <style jsx>
                {`
                    .card-container {
                        margin: 8px;
                        background: #ffffff;
                        border-radius: 2px;
                        border: 8px solid #9494a4;
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                            0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    }

                    .pokemon-name {
                        text-transform: capitalize;
                        color: #f66a6a;
                    }
                    .pokemon-image-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .pokemon-image {
                        height: 100%;
                        width: 100%;
                        max-width: 75px;
                        max-height: 75px;
                    }

                    .pokemon-stats,
                    .pokemon-name {
                        text-align: center;
                    }

                    .pokemon-stats {
                        font-size: 1.8rem;
                        color: #ffffff;
                    }

                    @keyframes holoFlip {
                        from: {
                            transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg);
                        }
                        to: {
                            transform: rotateZ(10deg) rotateX(10deg)
                                rotateY(10deg);
                        }
                    }
                    @keyframes holoCard {
                        0%,
                        100% {
                            transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg);
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

export default MyPokemonCard
