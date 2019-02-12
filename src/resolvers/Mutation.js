import uuid from "uuid";
const {transport, mailTemp} = require('./mail');
import * as dynamoDBLib from "../../libs/dynamodb-lib";



export const placeOrder = async (args, context) => {
	const params = {
		TableName: process.env.OrdersDB,
		Item : {
			orderId: uuid.v1(), 
			userId: "test",//context.event.requestContext.authorizer.claims.sub,
			studentNumber: "test",//context.event.requestContext.authorizer.claims["custom:studentNumber"],
			name: "test",//context.event.requestContext.authorizer.claims["custom:FullName"],
			email: "u14284783@tuks.co.za",//context.event.requestContext.authorizer.claims.email,
			univeristy: "test",//context.event.requestContext.authorizer.claims["custom:univeristy"],
			degree: "test",//context.event.requestContext.authorizer.claims["custom:degree"],
			bursary:  "test",//context.event.requestContext.authorizer.claims["custom:bursary"],
			cellNumber: "test",//context.event.requestContext.authorizer.claims["custom:cellNumber"],
			address:  "test",//context.event.requestContext.authorizer.claims["custom:address"],
	   
			ISBN: args.ISBN,
			title: args.title,
			edition: args.edition,
			author:  args.author,

			dateOrdered:  Date.now(),
			status: "received",
			orderStatus: "received",
			excelDate: new Date().toLocaleString(),
            statusDate: Date.now(),
			ETA: "01/01/0001",
			bookCondition: "TBA",
			deliveryMethod: "TBA",
			Vendor: "TBA",
            deliveryDate: "01/01/0001",
            costPrice: "0",
            sellingPrice: "0",
            wayBillNumber: "TBA",
			leadTime: "TBA",
			courierCost: "0"
		}
	}

	try{


		await dynamoDBLib.call("put", params);


		const mailRes = await transport.sendEmail({
			from: "noreply@pimpmybook.co.za",
			to: params.Item.email,
			subject: `Your Order (${params.Item.orderId}) Confirmation`,
			TextBody: mailTemp(` This is confirmation that you placed an order for ${args.title} ISBN: ${args.ISBN}`)
		}).then(response => {
			console.log(response.message)
		});


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

		

	} catch(e){
          return e;

	}
	
}



export const updateOrderInfo = async (args, context) => {
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
         ":leadTime": args.leadTime,
         ":courierCost": args.courierCost
        },
        UpdateExpression: 'SET  ETA = :ETA, Vendor = :Vendor,bookCondition = :bookCondition,deliveryMethod = :deliveryMethod,deliveryDate = :deliveryDate,costPrice = :costPrice,sellingPrice = :sellingPrice,wayBillNumber = :wayBillNumber,leadTime = :leadTime, courierCost = :courierCost',
        ReturnValues: 'ALL_NEW' 
    };
 
    try {
     const result = await dynamoDBLib.call("update", params);
     
     return result.Item;
    } catch(e){
     return e;
    }
 }
 
 export const updateOrderStatus = async (args, context) => {
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
 
         
         if (args.orderStatus === "Ready for collection" || args.orderStatus === "Delivered to Beneficiary" || args.orderStatus === "Beneficiary Collected"){
             
 
             const mailRes = await transport.sendEmail({
                 from: 'noreply@pimpmybook.co.za',
                 to: args.email,
                 subject: `Your Order (${args.orderId}) Status Update`,
                 TextBody: mailTemp(` Your order now has a status of : ${args.orderStatus}`)
             }).then(response => {
                 console.log(response.message)
             });
         } else {
             return null;
 
         }
 
         return result.Item;
       
     } catch (e){
         return e;
     }
 }
 

 export const updateOrder = async (args, context) => {
     
    const orderparams = {
        TableName: process.env.OrdersDB,
        Key: {
            userId: args.userId,
            orderId:args.orderId
        }, 
        ExpressionAttributeValues: {
            ":title" : args.title,
            ":ISBN": args.ISBN,
            ":edition": args.edition,
            ":author": args.author,
            ":updateDate": Date.now()
        },
        UpdateExpression: "SET title = :title, ISBN = :ISBN, edition = :edition, author = :author, updateDate = :updateDate",
        ReturnValues: "ALL_NEW"
    }

    const activityParams = {
        TableName: process.env.StudentsDB,
        Item: {
            userId: "6f1d9b77-2843-4b0b-b8bb-eb8a877f80a8",//context.event.requestContext.authorizer.claims.sub,
            orderId: "02c7a6b0-17e1-11e9-8afc-3507af94e477",//args.orderId,
            title : args.title,
            ISBN: args.ISBN,
            edition: args.edition,
            author: args.author,
            updateDate: Date.now()
        }


    }


    try {
        await dynamoDBLib.call("put", activityParams);

       const result =  await dynamoDBLib.call("update", orderparams);
       
        return result.Item

    } catch(e){
        return e;
    }
 }