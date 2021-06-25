import Navbar from '../../components/Navbar'

const PokemonDetails = () => {
    return (
        <>
            <Navbar />

            <div className="pokemon-container">
                <div className="pokemon-title">
                    <div>Charmander</div>
                    <div>
                        Voluptate dolor labore incididunt mollit sunt ipsum sit
                        reprehenderit cupidatat officia.
                    </div>
                </div>
                <div className="pokemon-image">
                    <img src="/charmander.png" />
                </div>
                <div className="pokemon-attr">
                    <div>Fire</div>
                    <div>Poison</div>
                </div>
            </div>
            <style jsx>{`
                .pokemon-container {
                    display: flex;
                }
                .pokemon-container > * {
                    flex: 1 1 10em;
                }
            `}</style>
        </>
    )
}



export default PokemonDetails
