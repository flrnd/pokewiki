import { gql } from 'apollo-server';

export const typeDefs = gql`
  # endpoint: https://pokeapi.co/api/v2/pokemon/
  type Pokemons {
    count: Int!
    next: String
    previous: String
    results: [Result!]!
  }

  type Result {
    name: String!
    url: String!
  }

  # endpoint: https://pokeapi.co/api/v2/pokemon/{id}
  type Pokemon {
    id: ID!
    name: String!
    height: Int!
    weight: Int!
    stats: [Stats!]!
    abilities: [Abilities!]!
    base_experience: Int
    moves: [Moves!]!
  }

  type Moves {
    id: ID!
    move: Move!
  }

  type Move {
    id: ID!
    name: String!
  }

  type Abilities {
    id: ID!
    ability: Ability!
    is_hidden: Boolean
    slot: Int!
  }
  type Ability {
    id: ID!
    name: String!
    url: String!
  }

  type Stats {
    id: ID!
    base_stat: Int!
    effort: Int!
    stat: Stat!
  }

  type Stat {
    id: ID!
    name: String!
  }
  # QUERY
  type Query {
    allPokemon: Pokemons
    pokemon(id: ID!): Pokemon
    ability(id: ID!): Abilities
    move(id: ID!): Moves
    stat(id: ID!): Stats
  }
`;
