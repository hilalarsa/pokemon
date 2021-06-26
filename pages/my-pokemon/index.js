import { useState, useEffect } from 'react'

import Layout from '../../components/Layout'
import MyPokemonCard from '../../components/MyPokemonCard'

import { useLocalStorage } from '../../hooks/hooks'

const MyPokemon = () => {
    const [owned, setOwned] = useLocalStorage("owned", "");
    console.log(owned)
    return (
        <>
            {/* <div>{JSON.stringify(ownedPokemon)}</div> */}
            <Layout>
                {owned != null
                    ? owned.map((item) => {
                          return (
                              <>
                                  <MyPokemonCard data={item} />
                              </>
                          )
                      })
                    : null}
            </Layout>
        </>
    )
}

export default MyPokemon
