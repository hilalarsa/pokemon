import { capitalizeFirst } from '../../../utils/helper'

const PokemonMoves = ({ pokemon }) => {
    return (
        <div className="normaltext" style={{ color: 'white' }}>
            <div className="info-text text-center info-margin">Moves</div>
            <div className="info-border">
                <div className="column">
                    <div>
                        {pokemon.moves.sort().map((item, key) => (
                            <>
                                <div
                                    key={key}
                                    className={`pills ${
                                        item.version_group_details[0]
                                            .level_learned_at > 5
                                            ? 'high-level'
                                            : ''
                                    }`}
                                >
                                    {capitalizeFirst(item.move.name)}
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonMoves
