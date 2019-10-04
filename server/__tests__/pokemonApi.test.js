import { PokemonsAPI } from '../src/datasource';
import { bulbasaur } from './dummyData/mocks';
import * as rawApiCall from './dummyData/mocks/1.json';

const myDataSource = new PokemonsAPI();
const spy = jest
  .spyOn(myDataSource, 'get')
  .mockImplementation(param => rawApiCall);
const result = myDataSource.get('pokemon', '1');

describe('API result', () => {
  describe('abilities', () => {
    it('has property: abilities', () => {
      expect(result).toHaveProperty('abilities');
    });
    it('abilities[0] has propertesy: ability, is_hidden, slot', () => {
      expect(result.abilities[0]).toHaveProperty('ability');
      expect(result.abilities[0]).toHaveProperty('is_hidden');
      expect(result.abilities[0]).toHaveProperty('slot');
    });
    it('ability has properties: name, url', () => {
      expect(result.abilities[0].ability).toHaveProperty('name');
      expect(result.abilities[0].ability).toHaveProperty('url');
    });
  });
});

describe('PokemonAPI', () => {
  it('calls get()', () => {
    expect(myDataSource.get).toHaveBeenCalledTimes(1);
  });

  test('getObjectByTypeAndId returns  an api request', async () => {
    await expect(
      myDataSource.getObjectByTypeAndId('pokemon', '1'),
    ).resolves.toMatchObject(rawApiCall);
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

  //test('getPokemonByURL returns a pokemon', async () => {
  //  const result = myDataSource.get('pokemon', '1');
  // await expect(
  //   myDataSource.getPokemonByURL('mocked/url'),
  //  ).resolves.toMatchObject(bulbasaur);
  //});
});
