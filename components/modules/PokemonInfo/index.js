import {  capitalizeFirst } from '../../../utils/helper'

const PokemonInfo = ({ pokemon }) => {
    return (
        <div className="normaltext zoomhover" style={{color: 'white'}}>
            <div className="info-text text-center info-margin">
                Pokemon Info
            </div>
            <div className="info-border">
                <div className="column">
                    <div>Base EXP</div>
                    <div>Height</div>
                    <div>Weight</div>
                    <div>Types</div>
                </div>
                <div className="column">
                    <div>{pokemon.base_experience}</div>
                    <div>{pokemon.height}</div>
                    <div>{pokemon.weight}</div>
                    <div>
                        {pokemon.types.map((item, key) => (
                            <div key={key} className="pills">
                                {capitalizeFirst(item.type.name)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonInfo
