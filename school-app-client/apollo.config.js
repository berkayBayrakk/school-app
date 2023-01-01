module.exports = {
    client: {
      service: {
        name: 'students',
        localSchemaFile: './graphql.schema.json',
      },
      excludes: ['**/generated/**'],
    },
  };
  