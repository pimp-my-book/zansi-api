import * as dynamoDBLib from "../libs/dynamodb-lib";
import uuid from "uuid";
const Json2csvParser = require('json2csv').Parser;
const {transport, mailTemp} = require('./mail')


const placeOrder = async (args, context) => {
	const params = {
		TableName: process.env.OrdersDB,
		Item : {
			orderId: uuid.v1(), 
			userId: "test",//context.event.requestContext.authorizer.claims.sub,
			studentNumber:"test", //context.event.requestContext.authorizer.claims["custom:studentNumber"],
			name: "test", //context.event.requestContext.authorizer.claims["custom:FullName"],
			email: "amomoloko@gmail.com", //context.event.requestContext.authorizer.claims.email,
			univeristy: "test", //context.event.requestContext.authorizer.claims["custom:univeristy"],
			degree: "test", //context.event.requestContext.authorizer.claims["custom:degree"],
			bursary: "test", //context.event.requestContext.authorizer.claims["custom:bursary"],
			cellNumber: "test", //context.event.requestContext.authorizer.claims["custom:cellNumber"],
			address: "test", //context.event.requestContext.authorizer.claims["custom:address"],
	   
			ISBN: args.ISBN,
			title: args.title,
			edition: args.edition,
			author:  args.author,
			dateOrdered:  Date.now(),
			status: "received",
			orderStatus: "Received",
			excelDate: new Date().toLocaleString(),
            statusDate: Date.now(),
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

	try{


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
		excelDate: new Date().toLocaleString(),
		dateOrdered: new Date().toLocaleString(),
		orderStatus: "received",
		status: "received",
		statusDate: new Date().toLocaleString(),
	}

		const mailRes = await transport.sendEmail({
			from: "amo@pimpmybook.co.za",
			to: args.email,
			subject: `Your Order (${params.Item.orderId}) Confirmation`,
			TextBody: mailTemp(` This is confirmation that you placed an order for ${args.title} ISBN: ${args.ISBN}`)
		}).then(response => {
			console.log(response.message)
		});

	} catch(e){
          return e;
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
	  

		 return studentOrders.Items
	   
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
        
	   },
	   UpdateExpression: 'SET  ETA = :ETA, Vendor = :Vendor,bookCondition = :bookCondition,deliveryMethod = :deliveryMethod,deliveryDate = :deliveryDate,costPrice = :costPrice,sellingPrice = :sellingPrice,wayBillNumber = :wayBillNumber',
	   ReturnValues: 'ALL_NEW' 
   };

   try {
	const result = await dynamoDBLib.call("update", params);
	
	return result.Item;
   } catch(e){
	return e;
   }
}

const updateOrderStatus = async (args, context) => {
	const params = {
		TableName: process.env.OrdersDB,
		Key: {
			userId: args.userId,
			orderId: args.orderId
		},
		ExpressionAttributeValues: {
		
			":orderStatus": args.orderStatus,
			":statusDate":  Date.now(),
		   },
		   UpdateExpression: 'SET  orderStatus = :orderStatus, statusDate = :statusDate',
		   ReturnValues: 'ALL_NEW' 
	}

	try {
		const result = await dynamoDBLib.call("update", params);

		const mailRes = await transport.sendEmail({
			from: 'u14284783@tuks.co.za',
			to: args.email,
			subject: `Your Order (${args.orderId}) Status Update`,
			TextBody: mailTemp(` your order now has a status of : ${args.orderStatus}`)
		}).then(response => {
			console.log(response.message)
		});

		return result.Item;
      
	} catch (e){
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
	    updateOrderStatus: (root, args, context) => updateOrderStatus(args, context)
	},
};
