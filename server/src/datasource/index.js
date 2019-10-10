import { RESTDataSource } from 'apollo-datasource-rest';
import * as reducer from './reducers';
import { getDescription, getByLanguage } from './util';

export default class PokemonsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://pokeapi.co/api/v2/';
  }

  async getAllPokemons(response) {
    const pageInfo = reducer.pageInfo(response);
    const list = await this.getPokemonsList(response.results);
    return {
      pageInfo,
      list,
    };
  }

  getPokemonsList(results) {
    const pokemons = results.map(async entry =>
      this.getPokemonByURL(entry.url),
    );
    return Promise.all(pokemons);
  }

  async getObjectByTypeAndId(type, id) {
    return this.get(`${type}/${id}/`);
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
    const flavorTextEntries = this.getByLanguage(
      'en',
      result.flavor_text_entries,
    );
    const description = getDescription(flavorTextEntries);
    const genera = getByLanguage('en', result.genera)[0].genus;
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
    return moves.map(move => this.reducer.move(move));
  }

  getAllTypes(pokemonTypes) {
    return pokemonTypes.map(pokemonType => this.reducer.pType(pokemonType));
  }

  getAllAbilities(abilities) {
    return abilities.map(ability => this.reducer.ability(ability));
  }

  getAllStats(stats) {
    return stats.map(stat => this.reducer.stat(stat));
  }
}
