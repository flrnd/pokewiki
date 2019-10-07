import * as reducers from '../../src/datasource/reducers';
import * as result from '../dummyData/mocks/1.json';

describe('Reducers spec', () => {
  it('returns stat', () => {
    expect(reducers.stat(result.stats[0])).toMatchObject({
      name: 'speed',
      baseStat: 45,
      effort: 0,
    });
  });

  it('returns ability: ', () => {
    expect(reducers.ability(result.abilities[0])).toMatchObject({
      name: 'chlorophyll',
      isHidden: true,
      slot: 3,
    });
  });

  it('returns moves', () => {
    expect(reducers.move(result.moves[0])).toMatchObject({
      name: 'razor-wind',
      levelLearnedAt: 0,
      moveLearnMethod: 'egg',
      versionGroup: 'gold-silver',
    });
  });

  it('returns pokemon type', () => {
    expect(reducers.pType(result.types[0])).toMatchObject({
      name: 'poison',
      slot: 2,
    });
  });
});
