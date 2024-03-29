import  {ApolloServer, gql} from "apollo-server-lambda";
import {schema} from "./schema";
import {resolvers} from "./resolvers";


/*const getUser = async ({requestContext: {authorizer}}) => {

	let sub
	if (event.requestContext.authorizer.claims === undefined){
		sub = "df55baa1-bbb9-4db2-8525-675ece0f6a60";
	} else {
		claims = event.requestContext.authorizer.claims;
	}
}*/

const server = new ApolloServer({
	typeDefs: schema,
	resolvers: resolvers,
	formatError: error => {
		console.log(error);
		return error;
	},
	formatResponse: response => {
		console.log(response);
		return response;
	},
	context:  ({event,context}) => ({
		headers: event.headers,
		functionName: context.functionName, 
		event,
	    context
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

/*
exports.record = (event, context, callback) => {
	event.Records.forEach((record) => {
		console.log(record.eventID);
		console.log(record.eventName);
		console.log("DynamoDB Record: %j", record.dynamodb);

	});
	callback(null,`Processed ${event.Records.length}`);
}*/