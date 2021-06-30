import { useState, useEffect } from 'react'

import Layout from '../../components/Layout'
import MyPokemonCard from '../../components/MyPokemonCard'

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
                    <div>Pokedex is empty</div>
                )}
            </Layout>
        </>
    )
}

export default MyPokemon
