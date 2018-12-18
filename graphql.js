 const {ApolloServer, gql} = require('apollo-server-lambda');

 const typeDefs = gql`
    type Query {
      hello: String
    }
 `;

 const resolvers = {
  Query: {
    hello: () => 'Zansi is Alive!!'
  },
 };

 const server = new ApolloServer({
   typeDefs,
   resolvers,
   context: ({event,context}) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
   }),
   });

 exports.graphqlHandler = server.createHandler({
   cors: {
     origin: "*",
     credentials: true,
   },
 });

