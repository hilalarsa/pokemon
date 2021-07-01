import { useState } from 'react'
import { capitalizeFirst } from '../../../utils/helper'

const PokemonMoves = ({ pokemon }) => {
    const [expanded, setExpanded] = useState(false)
    let moves = [...pokemon.moves] || []
    return (
        <div className="normaltext" style={{ color: 'white' }}>
            <div className="info-text text-center info-margin">Moves</div>
            <div className="info-border">
                <div className="column">
                    <div>
                        {!expanded ? (
                            <>
                                {moves && moves.length > 0
                                    ? moves.splice(0, 10).map((item, key) => (
                                          <>
                                              <div
                                                  key={key}
                                                  className={`pills ${
                                                      item
                                                          .version_group_details[0]
                                                          .level_learned_at > 5
                                                          ? 'high-level'
                                                          : ''
                                                  }`}
                                              >
                                                  {capitalizeFirst(
                                                      item.move.name
                                                  )}
                                              </div>
                                          </>
                                      ))
                                    : ''}
                                <div
                                    className="text-center pointer"
                                    onClick={() => setExpanded(true)}
                                >
                                    Show more
                                </div>
                            </>
                        ) : (
                            <>
                                {moves.map((item, key) => (
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
                                <div
                                    className="text-center pointer"
                                    onClick={() => setExpanded(false)}
                                >
                                    Hide
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonMoves
