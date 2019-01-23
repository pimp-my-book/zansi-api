import * as dynamoDBLib from "../libs/dynamodb-lib";
import uuid from "uuid";
const Json2csvParser = require('json2csv').Parser;


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


const orderList = async (args, context) => {
	const params = {
		TableName: process.env.OrdersDB
	}

    
	

	try {
		const result = await dynamoDBLib.call("scan",params);
        
		return result.Items
		
	}
	catch(e){
		return  e.message;
	}

}


const viewOrder = async (args, context) => {

	const params = {
		TableName: process.env.OrdersDB,
        Key: {
			userId: args.userId,
            orderId: args.orderId
		}
	};

	
	try {
		const result  = await dynamoDBLib.call("get",params);
		if (result.Item){
			return result.Item;
		} else {
			return "Order Not Found";
		}
	} catch(e){
		return e;
	}
}

const studentOrderList = async (args, context) => {
   const params = {
	TableName: process.env.OrdersDB,
	KeyConditionExpression: "userId = :userId",
	ExpressionAttributeValues: {
		":userId": args.userId
	}
   };

   console.log(params);
   try {
	   const result = await dynamoDBLib.call("query", params);
	   console.log(result);  
	   return result.Items;
   } catch(e){
	   return e;
   }
}

export const resolvers = {
	Query: {
		hello: () => "Zansi is now live!🎈 Zansi is a Pimp My Book ordering service for university textbooks 📚",
		orderList: (root, args, context) => orderList(args,context),
		viewOrder: (root, args, context) => viewOrder(args, context),
		studentOrderList: (root, args,context) => studentOrderList(args, context)
	},
	Mutation : {
		placeOrder: (root,args,context) => placeOrder(args,context),
	},
};
