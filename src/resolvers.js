import * as dynamoDBLib from "../libs/dynamodb-lib";
import uuid from "uuid";
const Json2csvParser = require('json2csv').Parser;


const placeOrder = async (args, context) => {
	const params = {
		TableName: process.env.OrdersDB,
		Item : {
			orderId: uuid.v1(), 
			userId: "test",//context.event.requestContext.authorizer.claims.sub,
			studentNumber:"test", //context.event.requestContext.authorizer.claims["custom:studentNumber"],
			name: "test", //context.event.requestContext.authorizer.claims["custom:FullName"],
			email: "test", //context.event.requestContext.authorizer.claims.email,
			univeristy: "test", //context.event.requestContext.authorizer.claims["custom:univeristy"],
			degree: "test", //context.event.requestContext.authorizer.claims["custom:degree"],
			bursary: "test", //context.event.requestContext.authorizer.claims["custom:bursary"],
			cellNumber: "test", //context.event.requestContext.authorizer.claims["custom:cellNumber"],
			address: "test", //context.event.requestContext.authorizer.claims["custom:address"],
	   
			ISBN: args.ISBN,
			title: args.title,
			edition: args.edition,
			author:  args.author,
			dateOrdered: new Date().toLocaleString(),
			status: "received",

			ETA: null,
			bookCondition: null,
			deliveryMethod: null,
			Vendor: null,
            deliveryDate: null,
            costPrice: null,
            sellingPrice: null,
            wayBillNumber: null,
            leadTime: null
		}
	}

	console.log(params)
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
		dateOrdered: new Date().toLocaleString(),
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

  
   try {
	   const studentOrders = await dynamoDBLib.call("query", params);
	   //console.log(studentOrders.Items);  

	    /*const history = studentOrders.Items.map(element => {
			return{
				...element
			}
			});*/

		 const history = studentOrders.Items.map(o => o);
		 return console.log(Object.entries(history));
	   
   } catch(e){
	   return e;
   }
}


const updateOrderInfo = async (args, context) => {
   const params = {
	   TableName: process.env.OrdersDB,
	   Key: {
		   userId: args.userId,
		   orderId: args.orderId
	   },
	   ExpressionAttributeValues: {
		
        ":ETA": args.ETA,
        ":Vendor": args.Vendor,
        ":bookCondition": args.bookCondition,
        ":deliveryMethod": args.deliveryMethod,
        ":deliveryDate": args.deliveryDate,
        ":costPrice": args.costPrice,
        ":sellingPrice": args.sellingPrice,
        ":wayBillNumber": args.wayBillNumber,
        ":leadTime": args.leadTime
	   },
	   UpdateExpression: 'SET  ETA = :ETA, Vendor = :Vendor,bookCondition = :bookCondition,deliveryMethod = :deliveryMethod,deliveryDate = :deliveryDate,costPrice = :costPrice,sellingPrice = :sellingPrice,wayBillNumber = :wayBillNumber,leadTime = :leadTime',
	   ReturnValues: 'ALL_NEW' 
   };

   try {
	const result = await dynamoDBLib.call("update", params);
	console.log(result);
	return result.Item;
   } catch(e){
	return e;
   }
}

export const resolvers = {
	Query: {
		hello: () => "Zansi is now live!🎈 Zansi is a Pimp My Book ordering service for university textbooks 📚",
		orderList: (root, args, context) => orderList(args,context),
		viewOrder: (root, args, context) => viewOrder(args, context),
		studentOrderList: (root, args,context) => studentOrderList(args, context),
	},
	Mutation : {
		placeOrder: (root,args,context) => placeOrder(args,context),
		updateOrderInfo: (root, args, context) => updateOrderInfo(args,context),
	},
};
