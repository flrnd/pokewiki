export const resolvers = {
  Query: {
    pokemon: async (root, { id }, { dataSources }) => {
      const result = await dataSources.PokeWikiApi.getObjectByTypeAndId(
        'pokemon',
        id,
      );
      return dataSources.PokeWikiApi.pokemonReducer(result);
    },
    allPokemon: (root, args, { dataSources }) =>
      dataSources.PokeWikiApi.getAllPokemons(),

    /* Not sure if I'm going to need these, check schema
      ability: (root, { id }, { dataSources }) =>
      dataSources.PokeWikiApi.getObjectByTypeAndId('ability', id),
      stat: (root, { id }, { dataSources }) =>
      dataSources.PokeWikiApi.getObjectByTypeAndId('stat', id),
      */
  },
};
