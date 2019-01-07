import * as dynamoDBLib from "../libs/dynamodb-lib";
import uuid from "uuid";


const studentDetails = async (args,context) => {

	console.log(context.event);
	const params = {
		TableName: process.env.StudentsDB,
		Item: {
			userId: context.event.requestContext.authorizer.claims.sub,
			studentNumber: args.studentNumber,
			name: args.name,
			email: args.email,
			university: args.university,
			degree: args.degree,
			currentYear: args.currentYear,
			bursary: args.bursary,
			cellNumber: args.cellNumber,
			address: args.address

		}

	}

	
	 await dynamoDBLib.call("put", params);

	 return {id: args.id,
		studentNumber: args.studentNumber,
		name: args.name,
		email: args.email,
		university: args.university,
		degree: args.degree,
		currentYear: args.currentYear,
		bursary: args.bursary,
		cellNumber: args.cellNumber,
		address: args.address};
}

const placeOrder = async (args, context) => {
	const params = {
		TableName: process.env.OrdersDB,
		Item : {
			id: uuid.v1(), 
			userID: args.userID,
			studentNumber: args.studentNumber,
			name: args.name,
			email: args.email,
			univeristy: args.univeristy,
			degree: args.degree,
			bursary: args.bursary,
			cellNumber: args.cellNumber,
			address: args.address,
	   
			ISBN: args.ISBN,
			title: args.title,
			edition: args.edition,
			author:  args.author,
			dateOrdered: Date.now(),
			status: args.status
		}
	}

	await dynamoDBLib.call("put", params);

	return {
		id: args.id,userID: args.userID,
		studentNumber: args.studentNumber,
		name: args.name,
		email: args.email,
		univeristy: args.univeristy,
		degree: args.degree,
		bursary: args.bursary,
		cellNumber: args.cellNumber,
		address: args.address,
   
		ISBN: args.ISBN,
		title: args.title,
		edition: args.edition,
		author:  args.author,
		dateOrdered: Date.now(),
		status: args.status}
}

export const resolvers = {
	Query: {
		hello: () => "Zansi is now live!🎈 Zansi is a Pimp My Book ordering service for university textbooks 📚"
	},
	Mutation : {
		studentDetails: (root, args,context) => studentDetails(args,context),
		placeOrder: (root,args,context) => placeOrder(args,context)
	},
};
