import { gql } from 'apollo-server';

export const AllPokemonsType = gql`
  type Pokemons {
    count: Int!
    next: String
    previous: String
    results: [Result!]!
  }
`;

export const AllPokemonsResultType = gql`
  type Result {
    name: String!
    url: String!
  }
`;
