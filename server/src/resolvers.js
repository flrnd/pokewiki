export const resolvers = {
  Query: {
    pokemon: async (_, { id }, { dataSources }) => {
      const result = await dataSources.PokeWikiApi.getObjectByTypeAndId(
        'pokemon',
        id,
      );
      return dataSources.PokeWikiApi.pokemonReducer(result);
    },
    allPokemon: async (_, { pageSize }, { dataSources }) =>
      await dataSources.PokeWikiApi.getAllPokemons(pageSize),

    /* Not sure if I'm going to need these, check schema
      ability: (root, { id }, { dataSources }) =>
      dataSources.PokeWikiApi.getObjectByTypeAndId('ability', id),
      stat: (root, { id }, { dataSources }) =>
      dataSources.PokeWikiApi.getObjectByTypeAndId('stat', id),
      */
  },
};
