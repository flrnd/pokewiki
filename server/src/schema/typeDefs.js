import fs from 'fs';

const typeDefs = fs.readFileSync('./src/schema/schema.graphql', 'utf8');

export default typeDefs;
