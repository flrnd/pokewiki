import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import resolvers from '../src/resolvers';
import typeDefs from '../src/schema/typeDefs';

import { pokemon, allPokemons } from './dummyData/mockPokemonService';
import { bulbasaur } from './dummyData/mocks';
import { gql } from 'apollo-server';

const PokemonTestCase = {
  id: 'Pokemon test case',
  query: `
    query {
      pokemon(id: 1) {
        id
        name
        pokemonTypes {
          slot
          name
        }
        height
        weight
        species {
          name
          color
          description
          baseHappiness
          captureRate
          genera
          growthRate
          habitat
          hatchCounter
        }
        stats {
          name
          baseStat
          effort
        }
        abilities {
          slot
          isHidden
          name
        }
        moves {
          name
          levelLearnedAt
          moveLearnMethod
          versionGroup
        }
      }
      `,
  variables: {},
  context: { pokemonService: pokemon },
  expected: { data: { pokemon: bulbasaur } },
};

describe('Pokemon Test case', () => {
  const cases = [PokemonTestCase];
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const { id, query, variables, context, expected } = PokemonTestCase;

  test(`query: ${id}`, async () => {
    const result = await graphql(schema, query, null, context, variables);
    return expect(result).toEqual(expected);
  });
});
