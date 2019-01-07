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
			orderId: uuid.v1(), 
			userId: "1234",
			studentNumber: 14523,
			name: "Thambo Thomas",
			email: "thambo@gmail.com",
			univeristy: "UCT",
			degree: "bcom",
			bursary: "Life",
			cellNumber: "025483694",
			address: "13 internet close",
	   
			ISBN: args.ISBN,
			title: args.title,
			edition: args.edition,
			author:  args.author,
			dateOrdered: Date.now(),
			status: "received"
		}
	}

	await dynamoDBLib.call("put", params);

	return {
		orderId: uuid.v1(),
		userId: args.userId,
		studentNumber:args.studentNumber,
		name: "Thambo Thomas",
		email:args.email,
		univeristy:args.univeristy,
		degree:args.degree,
		bursary:args.bursary,
		cellNumber:args.cellNumber,
		address:args.address,
   
		ISBN: args.ISBN,
		title: args.title,
		edition: args.edition,
		author:  args.author,
		dateOrdered: Date.now(),
		status: "received"
	}
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
