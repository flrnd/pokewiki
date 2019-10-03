export const resolvers = {
  Query: {
    pokemon: async (parent, { id }, { dataSources }) => {
      const result = await dataSources.PokemonsAPI.getObjectByTypeAndId(
        'pokemon',
        id,
      );
      const b = dataSources.PokemonsAPI.getPokemon(result);
      console.log(JSON.stringify(b));
      return b;
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
