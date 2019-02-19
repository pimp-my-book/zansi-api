import {orderList, viewOrder, studentOrderList } from "./Query";
import {placeOrder, updateOrderInfo, updateOrderStatus, updateOrder, cancelOrder} from "./Mutation";


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
		updateOrderStatus: (root, args, context) => updateOrderStatus(args, context),
		cancelOrder: (root, args, context) => cancelOrder(args, context)
	},
};