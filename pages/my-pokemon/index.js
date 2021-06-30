import { useState, useEffect } from 'react'

import Layout from '../../components/elements/Layout'
import MyPokemonCard from '../../components/modules/MyPokemonCard'

import { useLocalStorage } from '../../hooks/useLocalStorage'

const MyPokemon = () => {
    const [owned, setOwned] = useLocalStorage('owned', [])

    return (
        <>
            {/* <div>{JSON.stringify(ownedPokemon)}</div> */}
            <Layout>
                {owned && owned != null && owned.length > 0 ? (
                    owned.map((item, index) => {
                        if (item && item.pokemonName != null)
                            return (
                                <>
                                    <MyPokemonCard
                                        key={index}
                                        pokemonData={item}
                                        owned={owned}
                                        setOwned={() => {
                                            setOwned((storedValue) => [
                                                ...storedValue,
                                            ])
                                        }}
                                    />
                                </>
                            )
                    })
                ) : (
                    <div className="empty">
                        <div className="normaltext">Pokedex is empty</div>
                    </div>
                )}
                <style jsx>
                    {`
                        .empty {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 24px;
                            padding-top: 24px;
                            color: white;
                            margin: 24px;
                            padding: 48px;
                            border: 2px solid #fdfffc;
                        }
                    `}
                </style>
            </Layout>
        </>
    )
}

export default MyPokemon
