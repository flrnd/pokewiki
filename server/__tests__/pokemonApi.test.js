import { PokemonsAPI } from '../src/datasource';
import { bulbasaur } from './dummyData/mocks';
import * as rawApiCall from './dummyData/mocks/1.json';

describe('PokemonAPI', () => {
  const myDataSource = new PokemonsAPI();
  const result = myDataSource.get('pokemon', '1');

  beforeEach(() => {
    const spy = jest
      .spyOn(myDataSource, 'get')
      .mockImplementation(param => rawApiCall);
  });

  it('calls get()', () => {
    expect(myDataSource.get).toHaveBeenCalledTimes(1);
  });

  test('getObjectByTypeAndId returns  an api request', async () => {
    await expect(
      myDataSource.getObjectByTypeAndId('pokemon', '1'),
    ).resolves.toMatchObject(rawApiCall);
  });

  test('getAllTypes returns a pokemon-types array from a result', () => {
    expect(myDataSource.getAllTypes(result.types)).toMatchObject(bulbasaur);
  });

  test('getPokemonByURL returns a pokemon', async () => {
    await expect(
      myDataSource.getPokemonByURL('mocked/api/url'),
    ).resolves.toMatchObject(bulbasaur);
  });
});
