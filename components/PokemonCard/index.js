import Link from 'next/link'
import Image from 'next/image'
import LoadableImage from "../LoadableImage"

const PokemonCard = ({ data }) => {
    return (
        <>
            <Link
                href={{
                    pathname: '/pokemon/[slug]',
                    query: { slug: data.name },
                }}
            >
                <div className="card-container">
                    <div className="pokemon-image-container">
                        <LoadableImage src={data.image} width="75px" height="75px"/>
                    </div>
                    <div className="">
                        <div className="pokemon-name normaltext">{data.name}</div>
                    </div>
                </div>
            </Link>
            <style jsx>
                {`
                    .card-container {
                        cursor: pointer;
                        margin: 8px;
                        padding: 8px;
                        width: 100px;
                        height: 125px;
                        background: #FFFFFF;
                        border: 4px solid #9494a4;
                        border-radius: 10%;
                        box-shadow: 5px 8px #011627;
                        transition: transform 0.2s;
                        color: #f66a6a;
                        //animation: holoCard 15s ease infinite;
                    }

                    .card-container:hover {
                        transform: rotateX(10deg) rotateY(10deg);
                        background: #FF9F1C;
                        color: #FFFFFF;
                    }

                    .card-container:active {
                        transform: rotateX(10deg) rotateY(10deg);
                        background: #E71D36;
                        color: #FFFFFF;
                    }

                    .pokemon-name {
                        text-transform: capitalize;
                        font-size: .8em;
                        font-weight: 500;
                    }
                    .pokemon-image-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 80%;
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

export default PokemonCard
