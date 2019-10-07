import { PokemonsAPI } from '../../src/datasource';
import { bulbasaurSpecies } from '../dummyData/mocks';
import * as speciesApiCall from '../dummyData/mocks/species_1.json';

describe('Species spec', () => {
  const myDataSource = new PokemonsAPI();
  const spy = jest
    .spyOn(myDataSource, 'get')
    .mockImplementation(param => speciesApiCall);
  const result = myDataSource.get('species', '1');

  test('getSpecies return a species', async () => {
    await expect(myDataSource.getSpecies(result)).resolves.toMatchObject(
      bulbasaurSpecies,
    );
  });

  test('getSpeciesByURL returns a species object', async () => {
    await expect(
      myDataSource.getSpeciesByURL('species/1/'),
    ).resolves.toMatchObject(bulbasaurSpecies);
  });
});
