import { RESTDataSource } from 'apollo-datasource-rest';

export class PokemonsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://pokeapi.co/api/v2/';
  }

  async getAllPokemons(pageSize) {
    const response = await this.get(`pokemon/?offset=0&limit=${pageSize}`);
    const pageList = [];
    const list = [];

    response.results.filter(res => pageList.push(res.url));

    for (const [_, url] of pageList.entries()) {
      await list.push(this.getPokemonByURL(url));
    }

    const pageInfo = this.pageInfoReducer(response);
    return {
      pageInfo,
      list,
    };
  }

  pageInfoReducer(response) {
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
  }
  async getObjectByTypeAndId(type, id) {
    return await this.get(`${type}/${id}/`);
  }

  async getPokemonByURL(url) {
    const result = await this.get(url);
    return this.pokemonReducer(result);
  }

  async getSpecies(result) {
    const language = 'en';
    const description = getByLanguage(language, result.flavor_text_entries)
      .pop()
      .flavor_text.replace(/\n|\f/g, ' ');
    const genera = getByLanguage(language, result.genera).pop().genus;

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
  }

  pokemonReducer(pokemon) {
    return {
      id: pokemon.id,
      name: pokemon.name,
      pokemonTypes: this.getAllTypes(pokemon.types),
      height: pokemon.height,
      weight: pokemon.weight,
      species: pokemon.species,
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

const getByLanguage = (lang, list) =>
  list.filter(l => l.language.name === lang);
