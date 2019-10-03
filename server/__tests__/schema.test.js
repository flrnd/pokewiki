import { makeExecutableSchema, mockServer } from 'graphql-tools';
import { graphql } from 'graphql';
import typeDefs from '../src/schema/typeDefs';
import { PokemonsAPI } from '../src/datasource';
import schema from '../src/schema';
import { bulbasaur } from './dummyData/mocks';
import * as rawApiCall from './dummyData/mocks/1.json';

describe('Schema', () => {
  test('has valid type definitions', async () => {
    expect(async () => {
      const MockServer = mockServer(typeDefs);

      await MockServer.query(`{ __schema { types { name } } }`);
    }).not.toThrow();
  });
});

describe('PokemonAPI', () => {
  it('fetches bulbasaur', () => {
    const myDataSource = new PokemonsAPI();
    const spy = jest
      .spyOn(myDataSource, 'get')
      .mockImplementation((type, id) => rawApiCall);

    const result = myDataSource.get('pokemon', '1');
    const pokemonResult = myDataSource.getPokemon(result);
    expect(pokemonResult).toEqual(bulbasaur);
  });
});

