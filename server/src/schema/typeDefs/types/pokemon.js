import { gql } from 'apollo-server';

export const PokemonType = gql`
  type Pokemon {
    id: ID!
    name: String!
    height: Int!
    weight: Int!
    base_experience: Int
    order: Int
  }
`;
