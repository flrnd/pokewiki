const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  rules: {
    'graphql/capitalized-type-name': 'error',
    'graphql/named-operations': 'error',
    'graphql/no-deprecated-fields': 'error',
    'graphql/template-strings': [
      'error',
      {
        env: 'apollo',
        //schemaJsonFilepath: path.resolve(__dirname, './src/schema/schema.json'),
        // OR provide the schema in the Schema Language format
        //schemaString: printSchema('./schema.graphql'),
      },
    ],
  },
  plugins: ['graphql'],
};
