import { gql } from 'apollo-server';

export const queries = gql`
  type Query {
    allPokemon: Pokemons
    pokemon(id: ID!): Pokemon
  }
`;
