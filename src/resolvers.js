import * as dynamoDBLib from "../libs/dynamodb-lib";
import uuid from "uuid";

const TableName = process.env.tableName;

const data = {
	  studentDetails(args,context){
		const params = {
			TableName,
			Item: {
				id: args.id,
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

		console.log(args);

		return dynamoDBLib.call("put", params);
	}
}

export const resolvers = {
	Query: {
		hello: () => "Zansi is now live!🎈 Zansi is a Pimp My Book ordering service for university textbooks 📚"
	},
	Mutation : {
		studentDetails: (_, args,context) => data.studentDetails(args, context)
	},
};
