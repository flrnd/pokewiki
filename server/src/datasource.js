import fetch from 'node-fetch';
import { RESTDataSource } from 'apollo-datasource-rest';

export class PokeWikiApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://pokeapi.co/api/v2/';
  }

  async getAllPokemons(pageSize) {
    const response = await this.get(`pokemon/?offset=0&limit=${pageSize}`);
    const [pageList, list] = [];
    response.results.filter(res => pageList.push(res.url));
    for (const [_, url] of pageList.entries()) {
      await list.push(this.getPokemonByURL(url));
    }
    return {
      list,
    };
  }

  async getObjectByTypeAndId(type, id) {
    return await this.get(`${type}/${id}/`);
  }

  async getPokemonByURL(url) {
    const result = await this.get(url);
    return this.pokemonReducer(result);
  }

  async getSpecies(id) {
    const language = 'en';
    const species = await this.get(`pokemon-species/${id}`);
    const description = getByLanguage(language, species.flavor_text_entries)
      .pop()
      .flavor_text.replace(/\n|\f/g, ' ');
    const genera = getByLanguage(language, species.genera).pop().genus;

    return {
      name: species.name,
      color: species.color.name,
      description,
      genera,
      baseHappiness: species.base_happiness,
      captureRate: species.capture_rate,
      growthRate: species.growth_rate.name,
      habitat: species.habitat.name,
      hatchCounter: species.hatch_counter,
    };
  }

  pokemonReducer(pokemon) {
    return {
      id: pokemon.id,
      name: pokemon.name,
      pokemonTypes: this.getAllTypes(pokemon.types),
      height: pokemon.height,
      weight: pokemon.weight,
      species: this.getSpecies(pokemon.id),
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
