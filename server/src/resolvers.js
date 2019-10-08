export const resolvers = {
  Query: {
    pokemon: async (parent, { id }, { dataSources }) => {
      const result = await dataSources.PokemonsAPI.getObjectByTypeAndId(
        'pokemon',
        id,
      );
      return dataSources.PokemonsAPI.getPokemon(result);
    },
    allPokemon: async (parent, { pageSize, offSet = 0 }, { dataSources }) => {
      const response = await dataSources.PokemonsAPI.get(
        `pokemon/?offset=${offSet}&limit=${pageSize}`,
      );
      return dataSources.PokemonsAPI.getAllPokemons(response);
    },
    species: async (parent, { id }, { dataSources }) => {
      const result = await dataSources.PokemonsAPI.getObjectByTypeAndId(
        'pokemon-species',
        id,
      );
      return dataSources.PokemonsAPI.getSpecies(result);
    },
  },
  Pokemon: {
    species(parent, _, { dataSources }) {
      return dataSources.PokemonsAPI.getSpeciesByURL(parent.species.url);
    },
  },
};
