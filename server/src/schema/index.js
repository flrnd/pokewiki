import fs from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from '../resolvers';

const typeDefs = fs.readFileSync('./src/schema/schema.graphql', 'utf8');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
