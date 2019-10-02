import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import resolvers from '../src/resolvers';
import { pokemon, allPokemons } from './dummyData/mockPokemonService';
import { bulbasaur } from './dummyData/mocks';

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
  context: { pokemonService: mockPokemonService },
  expected: { data: { pokemon } },
};
