import * as dynamoDBLib from "../libs/dynamodb-lib";
import uuid from "uuid";

//const TableName = process.env.StudentsTable;
/*
const data = {
	  studentDetails(args,context){
		const params = {
			TableName: process.env.StudentsTable,
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
		console.log(params.TableName);
		return dynamoDBLib.call("put", params);
	}
}
*/

const studentDetails = async (args,context) => {

	console.log(context.event);
	const params = {
		TableName: process.env.StudentsDB,
		Item: {
			userId: args.id,
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


export const resolvers = {
	Query: {
		hello: () => "Zansi is now live!🎈 Zansi is a Pimp My Book ordering service for university textbooks 📚"
	},
	Mutation : {
		studentDetails: (root, args,context) => studentDetails(args,context)
	},
};
