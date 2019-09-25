import { ApolloServer } from 'apollo-server';
import { PokeWikiApi } from './datasource';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    PokeWikiApi: new PokeWikiApi(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`server ready at ${url}`);
});
