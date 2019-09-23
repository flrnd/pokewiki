export const resolvers = {
  Query: {
    pokemon: (root, { id }, { dataSources }) =>
      dataSources.PokeWikiApi.getObjectByTypeAndId('pokemon', id),
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
