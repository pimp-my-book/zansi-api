import uuid from "uuid";


describe("Student can list their orders", () => {


    
    
    test("It is able to retrive from dynamodb", async () => {
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


        expect(orderDetails.Item.orderId).not.toBe(null);
        expect(orderDetails.Item.userId).not.toBe(null);

    });

    test("It is not able to retrive from dynamodb", async () => {
        const orderDetails = {
            Item: {
                orderId: null, 
                userId: null,
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


        expect(orderDetails.Item.orderId).toBe(null);
        expect(orderDetails.Item.userId).toBe(null);

    });
    
    
})