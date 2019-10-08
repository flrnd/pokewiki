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

  test('getPokemon returns a pokemon from a result', () => {
    expect(myDataSource.getPokemon(result)).toMatchObject(bulbasaurQuery);
  });

  test('getPokemonsList returns a list of 3 pokemon', () => {
    return myDataSource
      .getPokemonsList(allPokemonsRequest.results)
      .then(list => {
        expect(list.length).toBe(3);
      });
  });

  test('getAllPokemons returns pageInfo and size of 3 list', async () => {
    const result = await myDataSource.getAllPokemons(allPokemonsRequest);
    // getAllPokemons calls internally getPokemonList, which resolves every
    // element in its own order. For this reason we need to 'convert' the
    // received and expected objects to make a proper comparison.
    const received = Object.entries(result).toString();
    const expected = Object.entries(allPokemonsQuery).toString();

    expect(result).toHaveProperty('pageInfo');
    expect(typeof result.pageInfo).toEqual(typeof {});
    expect(result).toHaveProperty('list');
    expect(typeof result.list).toBe(typeof []);
    expect(result.list.length).toBe(3);
    expect(received).toBe(expected);
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
