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
      height: pokemon.height,
      weight: pokemon.weight,
      stats: pokemon.stats,
      abilities: pokemon.abilities,
      baseExperience: pokemon.base_experience,
      moves: pokemon.moves,
    };
  }
}
