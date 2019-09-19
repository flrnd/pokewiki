import { ApolloServer } from 'apollo-server';
import { PokeWikiApi } from './schema/datasource';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';

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
