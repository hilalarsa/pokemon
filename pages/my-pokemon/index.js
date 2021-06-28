import { useState, useEffect } from 'react'

import Layout from '../../components/Layout'
import MyPokemonCard from '../../components/MyPokemonCard'

import { useLocalStorage } from '../../hooks/useLocalStorage'

const MyPokemon = () => {
    const [owned, setOwned] = useLocalStorage('owned', '')
    console.log(owned)
    return (
        <>
            {/* <div>{JSON.stringify(ownedPokemon)}</div> */}
            <Layout>
                {owned && owned != null
                    ? owned.map((item) => {
                          return (
                              <>
                                  <MyPokemonCard pokemonData={item} />
                              </>
                          )
                      })
                    : null}
            </Layout>
        </>
    )
}

export default MyPokemon
