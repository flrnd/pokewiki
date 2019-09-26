//import * as typeDefs from './schema/schema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';
import { gql } from 'apollo-server';

const typeDefs = gql`
  type Pokemons {
    list: [Pokemon]!
  }

  type Pokemon {
    id: ID!
    name: String!
    pokemonTypes: [PokemonType]!
    height: Int!
    weight: Int!
    species: Species!
    abilities: [Ability]!
    stats: [Stat]!
    moves: [Move]!
  }

  type Species {
    name: String!
    color: String!
    description: String!
    baseHappiness: Int!
    captureRate: Int!
    genera: String!
    growthRate: String!
    habitat: String!
    hatchCounter: Int!
  }

  type PokemonType {
    slot: Int!
    name: String!
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
    slot: Int!
  }

  type Stat {
    id: ID!
    name: String!
    baseStat: Int!
    effort: Int!
  }
  # QUERY
  type Query {
    allPokemon(pageSize: Int!): Pokemons!
    pokemon(id: ID!): Pokemon!
    # Not sure if I'm going to need these:
    # ability(id: ID!): Abilities
    # move(id: ID!): Moves
    # stat(id: ID!): Stats
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
