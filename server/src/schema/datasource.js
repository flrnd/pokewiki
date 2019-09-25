import { RESTDataSource } from 'apollo-datasource-rest';

export class PokeWikiApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://pokeapi.co/api/v2/';
  }

  async getAllPokemons() {
    return this.get('pokemon');
  }

  async getObjectByTypeAndId(type, id) {
    const result = await this.get(`${type}/${id}/`);
    return this.pokemonReducer(result);
  }

  pokemonReducer(pokemon) {
    return {
      id: pokemon.id,
      name: pokemon.name,
      pokemonTypes: this.getAllTypes(pokemon.types),
      height: pokemon.height,
      weight: pokemon.weight,
      description: 'some description',
      abilities: this.getAllAbilities(pokemon.abilities),
      stats: this.getAllStats(pokemon.stats),
      moves: this.getAllMoves(pokemon.moves),
    };
  }

  getAllMoves(moves) {
    return moves.map(move => this.moveReducer(move));
  }

  moveReducer(move) {
    const lastVersionGroup = move.version_group_details.pop();
    return {
      name: move.move.name,
      levelLearnedAt: lastVersionGroup.level_learned_at,
      moveLearnMethod: lastVersionGroup.move_learn_method.name,
      versionGroup: lastVersionGroup.version_group.name,
    };
  }

  getAllTypes(pokemonTypes) {
    return pokemonTypes.map(pokemonType => this.typeReducer(pokemonType));
  }

  typeReducer(pokemonType) {
    return {
      slot: pokemonType.slot,
      name: pokemonType.type.name,
    };
  }

  getAllAbilities(abilities) {
    return abilities.map(ability => this.abilityReducer(ability));
  }

  abilityReducer(ability) {
    return {
      name: ability.ability.name,
      slot: ability.slot,
      isHidden: ability.is_hidden,
    };
  }

  getAllStats(stats) {
    return stats.map(stat => this.statReducer(stat));
  }

  statReducer(stat) {
    return {
      name: stat.stat.name,
      baseStat: stat.base_stat,
      effort: stat.effort,
    };
  }
}
