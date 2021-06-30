import { gql } from '@apollo/client'

const GET_POKEMONS_BY_ID = gql`
    query Query($pokemonName: String!) {
        pokemon(name: $pokemonName) {
            id
            name
            weight
            height
            base_experience
            location_area_encounters
            sprites {
                front_default
            }
            species {
                name
            }
            types {
                slot
                type {
                    name
                }
            }
            moves {
                move {
                    name
                }
                version_group_details {
                    level_learned_at
                }
            }
            stats {
                effort
                base_stat
                stat {
                    name
                }
            }
        }
    }
`

const GET_POKEMONS = gql`
    query Query($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            results {
                id
                name
                image
            }
        }
    }
`

const GET_IMAGE_BY_NAME = gql`
    query Query($pokemonName: String!) {
        pokemon(name: $pokemonName) {
            sprites {
                front_default
            }
        }
    }
`

export { GET_POKEMONS, GET_POKEMONS_BY_ID, GET_IMAGE_BY_NAME }
