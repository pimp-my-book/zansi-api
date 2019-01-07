
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
			status: "received"
        }
    };

    expect(orderDetails).not.toBe(null);
});

test.skip("It does not submit to dynamodb", async () => {
    
});
})