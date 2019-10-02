import { ApolloServer } from 'apollo-server';
import { PokemonsAPI } from './src/datasource';
import schema from './src/schema';

const server = new ApolloServer({
  schema,
  dataSources: () => ({
    PokemonsAPI: new PokemonsAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`server ready at ${url}`);
});
