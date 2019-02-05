
import uuid from "uuid";

describe("Create Order", () => {



test("It is able to submit to dynamodb", async () => {
  
    const orderDetails = {
        Item: {
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
	   
			ISBN: 12345,
			title: "To be or Not to Be",
			edition: "4th",
			author:  "Staedtler",
			dateOrdered: Date.now(),
			orderStatus: "received"
        }
    };

	expect(orderDetails).not.toBe(null);
	expect(orderDetails.Item.orderStatus).toBe("received");
});

test("It does not submit to dynamodb", async () => {
    const orderDetails = {
        Item: {
            orderId: uuid.v1(), 
			userId: "1234",
			studentNumber: 14523,
			name: " ",
			email: "thambo@gmail.com",
			univeristy: "UCT",
			degree: "bcom",
			bursary: "Life",
			cellNumber: "025483694",
			address: "13 internet close",
	   
			ISBN: null ,
			title: null ,
			edition: null ,
			author:  null ,
			dateOrdered: Date.now(),
			orderStatus: "received"
        }
	};
	
	expect(orderDetails.Item.ISBN).toBe(null);
	expect(orderDetails.Item.title).toBe(null)
	expect(orderDetails.Item.edition).toBe(null)
	expect(orderDetails.Item.author).toBe(null)
});
})