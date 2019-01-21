import  {ApolloServer, gql} from "apollo-server-lambda";


const typeDefs = gql`
  type Query {
      hello: String
  }
`;

const resolvers = {
    Query: {
        hello: () => "This is the PMB Staff service!🎈"
    }
};


const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: error => {
		console.log(error);
		return error;
	},
	formatResponse: response => {
		console.log(response);
		return response;
	},
	context: ({event,context}) => ({
		headers: event.headers,
		functionName: context.functionName,
		event,
		context,
	}),
	tracing: true,
	playground: true
});

exports.graphqlHandler = (event,context,callback) =>{
	const handler = server.createHandler({
		cors: {
			origin: "*",
			credentials:true,
			methods: [
				"POST",
				"GET"
			], 
			allowedHeaders: [
				"Content-Type",
				"Origin",
				"Accept"
			]
		},
	}) ;

	return handler(event, context,callback);
};