import { gql } from 'apollo-server';

export const typeDefs = gql`
  # endpoint: https://pokeapi.co/api/v2/pokemon/
  type Pokemons {
    count: Int!
    next: String
    previous: String
    results: [Result]!
  }

  type Result {
    name: String!
    url: String!
  }

  # endpoint: https://pokeapi.co/api/v2/pokemon/{id}
  type Pokemon {
    id: ID!
    name: String!
    pokemonTypes: [PokemonType]
    height: Int!
    weight: Int!
    description: String!
    abilities: [Ability]!
    stats: [Stat]!
    moves: [Move]!
  }

  type PokemonType {
    slot: Int
    name: String
  }

  type Move {
    id: ID!
    name: String!
    levelLearnedAt: Int!
    moveLearnMethod: String!
    versionGroup: String!
  }

  type Ability {
    id: ID!
    name: String!
    isHidden: Boolean!
    slot: Int
  }

  type Stat {
    id: ID!
    name: String
    baseStat: Int
    effort: Int
  }
  # QUERY
  type Query {
    allPokemon: Pokemons
    pokemon(id: ID!): Pokemon

    # Not sure if I'm going to need these:
    # ability(id: ID!): Abilities
    # move(id: ID!): Moves
    # stat(id: ID!): Stats
  }
`;
