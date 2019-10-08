import { PokemonsAPI } from '../../src/datasource';
import {
  bulbasaurRequest,
  bulbasaurQuery,
  bulbasaurSpeciesRequest,
  bulbasaurSpeciesQuery,
  allPokemonsRequest,
  allPokemonsQuery,
} from '../dummyData/mocks';

describe('Datasource Spec Pokemon', () => {
  const myDataSource = new PokemonsAPI();
  const spy = jest
    .spyOn(myDataSource, 'get')
    .mockImplementation(param => bulbasaurRequest);
  const result = myDataSource.get('pokemon', '1');

  test('calls get()', () => {
    expect(myDataSource.get).toHaveBeenCalledTimes(1);
  });

  test('getObjectByTypeAndId returns  an api request', async () => {
    await expect(
      myDataSource.getObjectByTypeAndId('pokemon', '1'),
    ).resolves.toMatchObject(bulbasaurRequest);
  });

  test('getPokemon returns a pokemon from a result', async () => {
    await expect(myDataSource.getPokemon(result)).toMatchObject(bulbasaurQuery);
  });

  test('getAllTypes returns a pokemon-types array from a result', () => {
    expect(myDataSource.getAllTypes(result.types)).toMatchObject(
      bulbasaurQuery.pokemonTypes,
    );
  });

  test('getAllMoves returns a pokemon-moves array from a result', () => {
    const moves = myDataSource.getAllMoves(result.moves);
    expect(moves).toMatchObject(bulbasaurQuery.moves);
  });

  test('getAllStats returns a pokemon-stats array from a result', () => {
    expect(myDataSource.getAllStats(result.stats)).toMatchObject(
      bulbasaurQuery.stats,
    );
  });

  test('getAllAbilities returns a pokemon-abilities array from a result', () => {
    expect(myDataSource.getAllAbilities(result.abilities)).toMatchObject(
      bulbasaurQuery.abilities,
    );
  });

  test('getPokemonByURL returns a pokemon', async () => {
    await expect(
      myDataSource.getPokemonByURL('mocked/url'),
    ).resolves.toMatchObject(bulbasaurQuery);
  });
});
