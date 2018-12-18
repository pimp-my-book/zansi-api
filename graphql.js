 const {ApolloServer, gql} = require('apollo-server-lambda');
import {success, failure} from "./libs/response-lib";

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

 exports.graphqlHandler = (event,context,callback) =>{
  const handler = server.createHandler({
    cors: {
      origin: '*',
      methods: [
        'POST'
      ], 
      allowedHeaders: [
        'Content-Type',
        'Origin',
        'Accept'
      ]
    },
   }) ;

   return handler(event, context,callback);
 };

