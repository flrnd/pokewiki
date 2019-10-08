import { PokemonsAPI } from '../../src/datasource';
import {
  bulbasaurSpeciesQuery,
  bulbasaurSpeciesRequest,
} from '../dummyData/mocks';

describe('Species spec', () => {
  const myDataSource = new PokemonsAPI();
  const spy = jest
    .spyOn(myDataSource, 'get')
    .mockImplementation(param => bulbasaurSpeciesRequest);
  const result = myDataSource.get('species', '1');

  test('getSpecies return a species', async () => {
    await expect(myDataSource.getSpecies(result)).resolves.toMatchObject(
      bulbasaurSpeciesQuery,
    );
  });

  test('getSpeciesByURL returns a species object', async () => {
    await expect(
      myDataSource.getSpeciesByURL('species/1/'),
    ).resolves.toMatchObject(bulbasaurSpeciesQuery);
  });
});
