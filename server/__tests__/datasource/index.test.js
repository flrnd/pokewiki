import { PokemonsAPI } from '../../src/datasource';
import { bulbasaur } from '../dummyData/mocks';
import * as apiCall from '../dummyData/mocks/1.json';

const myDataSource = new PokemonsAPI();
const spy = jest
  .spyOn(myDataSource, 'get')
  .mockImplementation(param => apiCall);
const result = myDataSource.get('pokemon', '1');

describe('Datasource Spec', () => {
  it('calls get()', () => {
    expect(myDataSource.get).toHaveBeenCalledTimes(1);
  });

  test('getObjectByTypeAndId returns  an api request', async () => {
    await expect(
      myDataSource.getObjectByTypeAndId('pokemon', '1'),
    ).resolves.toMatchObject(apiCall);
  });

  test('getPokemon returns a pokemon from a result', () => {
    const moves = myDataSource.getAllMoves(result.moves);
    expect(result.moves[0].version_group_details[0]).toHaveProperty(
      'level_learned_at',
    );
  });

  test('getAllTypes returns a pokemon-types array from a result', () => {
    expect(myDataSource.getAllTypes(result.types)).toMatchObject(
      bulbasaur.pokemonTypes,
    );
  });

  test('getAllMoves returns a pokemon-moves array from a result', () => {
    const moves = myDataSource.getAllMoves(result.moves);
    expect(moves).toMatchObject(bulbasaur.moves);
  });

  test('getAllStats returns a pokemon-stats array from a result', () => {
    expect(myDataSource.getAllStats(result.stats)).toMatchObject(
      bulbasaur.stats,
    );
  });

  test('getAllAbilities returns a pokemon-abilities array from a result', () => {
    expect(myDataSource.getAllAbilities(result.abilities)).toMatchObject(
      bulbasaur.abilities,
    );
  });

  test('getPokemonByURL returns a pokemon', async () => {
    await expect(
      myDataSource.getPokemonByURL('mocked/url'),
    ).resolves.toMatchObject(bulbasaur);
  });
});
