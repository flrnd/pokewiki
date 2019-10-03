import { mockServer } from 'graphql-tools';
import typeDefs from '../src/schema/typeDefs';
import { PokemonsAPI } from '../src/datasource';
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
  const myDataSource = new PokemonsAPI();
  let result = '';

  beforeEach(() => {
    const spy = jest
      .spyOn(myDataSource, 'get')
      .mockImplementation((type, id) => rawApiCall);
    result = myDataSource.get('pokemon', '1');
  });

  it('calls get()', () => {
    expect(myDataSource.get).toHaveBeenCalledTimes(1);
  });

  it('fetches bulbasaur', () => {
    const pokemonResult = myDataSource.getPokemon(result);
    expect(pokemonResult).toEqual(bulbasaur);
  });
});
