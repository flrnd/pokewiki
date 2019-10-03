export const resolvers = {
  Query: {
    pokemon: async (parent, { id }, { dataSources }) => {
      const result = await dataSources.PokemonsAPI.getObjectByTypeAndId(
        'pokemon',
        id,
      );
      return dataSources.PokemonsAPI.getPokemon(result);
    },
    allPokemon: (parent, { pageSize }, { dataSources }) =>
      dataSources.PokemonsAPI.getAllPokemons(pageSize),

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
