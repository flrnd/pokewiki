export const resolvers = {
  Query: {
    pokemon: async (_, { id }, { dataSources }) => {
      const result = await dataSources.PokemonsAPI.getObjectByTypeAndId(
        'pokemon',
        id,
      );
      //return dataSources.PokemonsAPI.pokemonReducer(result);
      console.log(result);
      return result;
    },
    allPokemon: async (_, { pageSize }, { dataSources }) =>
      await dataSources.PokemonsAPI.getAllPokemons(pageSize),

    species: async (_, { id }, { dataSources }) => {
      const result = await dataSources.PokemonsAPI.getObjectByTypeAndId(
        'pokemon-species',
        id,
      );
      return dataSources.PokemonsAPI.getSpecies(result);
    },
  },
};
