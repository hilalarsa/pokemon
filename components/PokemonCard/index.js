import Link from 'next/link'

const PokemonCard = ({ data }) => {
    console.log(data)
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
                        <img src={data.image} className="pokemon-image" />
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
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                            0 6px 20px 0 rgba(0, 0, 0, 0.19);
                        perspective: 1000px;
                        transition: transform 0.2s;
                        //animation: holoCard 15s ease infinite;
                    }

                    .card-container:hover {
                        transform: rotateX(10deg) rotateY(20deg);
                        color: red;
                        background: #ffffff;
                    }

                    .pokemon-name {
                        text-transform: capitalize;
                        color: #f66a6a;
                        font-size: .8em;
                        font-weight: 
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

export default PokemonCard
