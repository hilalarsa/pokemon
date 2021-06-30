import {  capitalizeFirst } from '../../../utils/helper'

const PokemonStats = ({ pokemon }) => {
    return (
        <div
            className="normaltext zoomhover"
            style={{ paddingBottom: '48px', color: 'white'}}
        >
            <div className="info-text text-center">Base Stats</div>
            <div className="info-border">
                <div className="column">
                    {pokemon.stats.map((item, key) => {
                        return (
                            <div key={key} className="flex center">
                                <div
                                    className="column"
                                    style={{ marginRight: '12px' }}
                                >
                                    {capitalizeFirst(item.stat.name)}
                                </div>
                                <div className="flex column">
                                    {[
                                        ...Array(
                                            Math.floor(
                                                parseInt(item.base_stat) / 20
                                            )
                                        ),
                                    ].map((e, i) => (
                                        <div key={i} className="bar"></div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default PokemonStats
