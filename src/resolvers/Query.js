import * as dynamoDBLib from "../../libs/dynamodb-lib";

export const orderList = async (args, context) => {
	const params = {
		TableName: process.env.OrdersDB,
		
	}

    
	

	try {
		const result = await dynamoDBLib.call("scan",params);
			
		 return result.Items
			

	}
	catch(e){
		return  e.message;
	}

}



export const viewOrder = async (args, context) => {

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

export const studentOrderList = async (args, context) => {
   const params = {
	TableName: process.env.OrdersDB,
	KeyConditionExpression: "userId = :userId",
	ExpressionAttributeValues: {
		":userId": context.event.requestContext.authorizer.claims.sub
	}
   };

  
   try {
	   const studentOrders = await dynamoDBLib.call("query", params);
	  

		 return studentOrders.Items
	   

   } catch(e){
	   return e;
   }
}

export const activityList  = async (Args, context) => {
    const params = {
        TableName: process.env.StudentsDB
    }

    try{
        const result = await dynamoDBLib.call("scan", )
    } catch(e){
        return e;
    }
}

