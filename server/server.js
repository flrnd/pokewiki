import { ApolloServer } from 'apollo-server';
import { PokeWikiApi } from './src/datasource';
import schema from './src/schema';

const server = new ApolloServer({
  schema,
  dataSources: () => ({
    PokeWikiApi: new PokeWikiApi(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`server ready at ${url}`);
});
