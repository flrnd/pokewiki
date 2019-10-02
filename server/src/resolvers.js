export const resolvers = {
  Query: {
    pokemon: async (_, { id }, { dataSources }) => {
      const result = await dataSources.PokemonsAPI.getObjectByTypeAndId(
        'pokemon',
        id,
      );
      return dataSources.PokemonsAPI.pokemonReducer(result);
    },
    allPokemon: async (_, { pageSize }, { dataSources }) =>
      await dataSources.PokemonsAPI.getAllPokemons(pageSize),

    /* Not sure if I'm going to need these, check schema
      ability: (root, { id }, { dataSources }) =>
      dataSources.PokeWikiApi.getObjectByTypeAndId('ability', id),
      stat: (root, { id }, { dataSources }) =>
      dataSources.PokeWikiApi.getObjectByTypeAndId('stat', id),
      */
  },
};
