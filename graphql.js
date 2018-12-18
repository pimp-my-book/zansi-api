 const {ApolloServer, gql} = require('apollo-server-lambda');
import {success, failure} from "./libs/response-lib";
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');



const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType', // an arbitrary name
    fields: {
      // the query has a field called 'greeting'
      hello: {
        // we need to know the user's name to greet them
        
        // the greeting message is a string
        type: GraphQLString,
        // resolve to a greeting message
        resolve(){
         return 'Hello World'
        },
      },
    },
  }),
})

module.exports.query = (event, context,callback) => 
 graphql(schema, event.queryStringParameters.query)
 .then(
   result => callback(null, {statusCode:200,body: JSON.stringify(result)}),
   err => callback(err)
 );


/*
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

*/