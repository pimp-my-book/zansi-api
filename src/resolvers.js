import * as dynamoDBLib from "../libs/dynamodb-lib";
import uuid from "uuid";
const Json2csvParser = require('json2csv').Parser;


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
			userId: context.event.requestContext.authorizer.claims.sub,
			studentNumber: context.event.requestContext.authorizer.claims["custom:studentNumber"],
			name:  context.event.requestContext.authorizer.claims["custom:FullName"],
			email:  context.event.requestContext.authorizer.claims.email,
			univeristy:  context.event.requestContext.authorizer.claims["custom:univeristy"],
			degree:  context.event.requestContext.authorizer.claims["custom:degree"],
			bursary:  context.event.requestContext.authorizer.claims["custom:bursary"],
			cellNumber:  context.event.requestContext.authorizer.claims["custom:cellNumber"],
			address:  context.event.requestContext.authorizer.claims["custom:address"],
	   
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
		orderId: params.Item.orderId,
		userId: args.userId,
		studentNumber:args.studentNumber,
		name: args.name,
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
		status: args.status
	}
}


const exportToExcel = async (args, context) => {
	const params = {
		TableName: process.env.OrdersDB
	}

    
	const fields = [
		"userId",
		"orderId",
		"ISBN",
		"author",
		"dateOrdered",
		"edition",
		"status",
		"title",
		"email",
		"address",
		"bursary",
		"cellNumber",
		"degree",
		"name",
		"studentNumber",
		"univeristy",
		]

	try {
		const result = await dynamoDBLib.call("scan",params);
        const json2csvParser = new Json2csvParser({fields});
		const csv = json2csvParser.parse(result.Items)
		console.log(csv);
		return {message: "Export successfull", csv}
	}
	catch(e){
		return {message: `Export Unsuccessful ${e.message}`}
	}

}
export const resolvers = {
	Query: {
		hello: () => "Zansi is now live!🎈 Zansi is a Pimp My Book ordering service for university textbooks 📚"
	},
	Mutation : {
		studentDetails: (root, args,context) => studentDetails(args,context),
		placeOrder: (root,args,context) => placeOrder(args,context),
		exportToExcel: (root, args, context) => exportToExcel(args,context)
	},
};
