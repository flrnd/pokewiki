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
    return result;
  }

  async getStatByID(id) {
    const result = await this.get(`stat/${id}`);
    console.log(result);
    return result;
  }
}
