import { RESTDataSource } from 'apollo-datasource-rest';
import * as reducer from './reducers';
import { getDescription, getByLanguage } from './util';

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

    const pageInfo = reducer.pageInfo(response);
    return {
      pageInfo,
      list,
    };
  }

  async getObjectByTypeAndId(type, id) {
    return await this.get(`${type}/${id}/`);
  }

  async getPokemonByURL(url) {
    const result = await this.get(url);
    return this.getPokemon(result);
  }

  async getSpeciesByURL(url) {
    const result = await this.get(url);
    return this.getSpecies(result);
  }

  // refactor this code
  async getSpecies(result) {
    const language = 'en';
    const descriptionList = getByLanguage(language, result.flavor_text_entries);

    const description = getDescription(descriptionList);
    const generaList = getByLanguage(language, result.genera);
    const genera = generaList[generaList.length - 1].genus;

    return reducer.species(result, description, genera);
  }

  getPokemon(pokemon) {
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
    return moves.map(move => reducer.move(move));
  }

  getAllTypes(pokemonTypes) {
    return pokemonTypes.map(pokemonType => reducer.pType(pokemonType));
  }

  getAllAbilities(abilities) {
    return abilities.map(ability => reducer.ability(ability));
  }

  getAllStats(stats) {
    return stats.map(stat => reducer.stat(stat));
  }
}
