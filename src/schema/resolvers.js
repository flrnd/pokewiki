export const resolvers = {
  Query: {
    pokemon: (root, { id }, { dataSources }) =>
      dataSources.PokeWikiApi.getObjectByTypeAndId('pokemon', id),
    allPokemon: (root, args, { dataSources }) =>
      dataSources.PokeWikiApi.getAllPokemons(),
    ability: (root, { id }, { dataSources }) =>
      dataSources.PokeWikiApi.getObjectByTypeAndId('ability', id),
    stat: (root, { id }, { dataSources }) =>
      dataSources.PokeWikiApi.getObjectByTypeAndId('stat', id),
  },
};
