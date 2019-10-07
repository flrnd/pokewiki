import { checkArraySize } from './util';

export const stat = stat => {
  return {
    name: stat.stat.name,
    baseStat: stat.base_stat,
    effort: stat.effort,
  };
};

export const ability = ability => {
  return {
    name: ability.ability.name,
    slot: ability.slot,
    isHidden: ability.is_hidden,
  };
};

export const pType = pokemonType => {
  return {
    slot: pokemonType.slot,
    name: pokemonType.type.name,
  };
};

export const move = move => {
  const size = checkArraySize(move.version_group_details.length - 1);
  const lastVersionGroup = move.version_group_details[size];
  return {
    name: move.move.name,
    levelLearnedAt: lastVersionGroup.level_learned_at,
    moveLearnMethod: lastVersionGroup.move_learn_method.name,
    versionGroup: lastVersionGroup.version_group.name,
  };
};

export const pageInfo = response => {
  const pageInfo = {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: '',
    endCursor: '',
  };

  response.next
    ? ((pageInfo.hasNextPage = true), (pageInfo.endCursor = response.next))
    : pageInfo;
  response.previous
    ? ((pageInfo.hasPreviousPage = true),
      (pageInfo.startCursor = response.previous))
    : pageInfo;

  return pageInfo;
};

export const species = (result, description, genera) => {
  return {
    name: result.name,
    color: result.color.name,
    description,
    genera,
    baseHappiness: result.base_happiness,
    captureRate: result.capture_rate,
    growthRate: result.growth_rate.name,
    habitat: result.habitat.name,
    hatchCounter: result.hatch_counter,
  };
};
