import { ApolloServer } from 'apollo-server';
import { PokeWikiApi } from './datasource';
import schema from './schema';

const server = new ApolloServer({
  schema,
  dataSources: () => ({
    PokeWikiApi: new PokeWikiApi(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`server ready at ${url}`);
});
