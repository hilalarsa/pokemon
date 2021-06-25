import Link from 'next/link'

const PokemonCard = () => {
    return (
        <>
            <Link
                href={{
                    pathname: '/pokemon/[slug]',
                    query: { slug: "charmander" },
                }}
            >
                <div className="card-container">
                    <div className="row">
                        <h3 className="pokemon-name">Charmander</h3>
                    </div>
                    <div className="row">
                        <img
                            src="/charmander.png"
                            className="u-max-full-width pokemon-image"
                        />
                        <div className="row">
                            <p className="pokemon-stats">Stats</p>
                        </div>
                    </div>
                </div>
            </Link>
            <style jsx>
                {`
                    .card-container {
                        margin: 12px;
                        max-width: 200px;
                        max-height: 350px;
                        background: #211799;
                        border-radius: 2px;
                        border: 1px solid #9494a4;
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                            0 6px 20px 0 rgba(0, 0, 0, 0.19);
                        //animation: holoCard 15s ease infinite;
                    }

                    .card-container:hover {
                        animation: holoFlip 1s ease;
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

                    .pokemon-name {
                        text-transform: capitalize;
                        color: #f66a6a;
                    }

                    .pokemon-image {
                        height: 100px;
                        width: 100%;
                    }

                    .pokemon-stats,
                    .pokemon-name {
                        text-align: center;
                    }

                    .pokemon-stats {
                        font-size: 1.8rem;
                        color: #ffffff;
                    }
                `}
            </style>
        </>
    )
}

export default PokemonCard
