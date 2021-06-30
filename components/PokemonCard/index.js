import Link from 'next/link'
import Image from 'next/image'
import LoadableImage from '../LoadableImage'

const PokemonCard = ({ data }) => {
    return (
        <>
            <Link
                href={{
                    pathname: '/pokemon/[slug]',
                    query: { slug: data.name },
                }}
                passHref
            >
                <div className="card-container zoomhover">
                    <div className="pokemon-image-container">
                        <Image
                            src={data.image}
                            width="75px"
                            height="75px"
                            alt="Pokemon Card"
                        />
                    </div>
                    <div className="">
                        <div className="pokemon-name normaltext">
                            {data.name}
                        </div>
                    </div>
                </div>
            </Link>
            <style jsx>
                {`
                    .card-container {
                        cursor: pointer;
                        margin: 4px;
                        padding: 8px;
                        width: 100px;
                        height: 125px;
                        background: #ffffff;
                        border: 4px solid #fdfffc;
                        border-radius: 10%;
                        box-shadow: 5px 5px rgba(255, 255, 255, 0.5);
                        transition: transform 0.2s;
                        color: #f66a6a;
                        //animation: holoCard 15s ease infinite;
                    }

                    .card-container:active {
                        transform: rotateX(10deg) rotateY(10deg);
                        background: #e71d36;
                        color: #ffffff;
                    }

                    .pokemon-name {
                        text-transform: capitalize;
                        font-size: 0.8em;
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
                `}
            </style>
        </>
    )
}

export default PokemonCard
