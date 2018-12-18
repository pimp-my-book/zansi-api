import {success, failure} from "./libs/response-lib";
import express from "express";
import serverless from 'serverless-http';
import {ApolloServer,gql} from 'apollo-server-express';

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


 const app = express();
 const server = new ApolloServer({
   typeDefs,
   resolvers,
   path: '/graphql',
 });

 server.applyMiddleware({app});
 export const graphql = serverless(app);

 

 /*
 const server = new ApolloServer({
   typeDefs,
   resolvers,
   context: ({event,context}) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
   }),
   playground: {
     endpoint: '/graphql'
   }
   });

 exports.graphqlHandler = (event,context,callback) =>{
  const handler = server.createHandler({
    cors: {
      origin: '*',
      methods: 'POST',
      allowedHeaders: [
        'Content-Type',
        'Origin',
        'Accept'
      ]
    },
   }) ;

   return handler(event, context,callback);
 };
*/
