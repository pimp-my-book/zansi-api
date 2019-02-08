import uuid from "uuid";


describe("Staff can query all the orders in DynamoDB", () => {

    it("It is able to retrive from dynamDB", async () => {


        const orderDetails = [
            {
                userId: "63f70088-2218-4a03-a206-48f576a553cc",
                orderId: "39c015d0-1e44-11e9-ab86-fb4cb32fd6ad",
                studentNumber: "dbdmpo001",
                name: "Mpodumo Doubada",
                email: "mkdoubada@gmail.com",
                univeristy: "UFS",
                cellNumber: "0726826064",
                address: "1 Palm Street Woodstock Cape Town",
                ISBN: "9780258636958",
                title: "Economics for south african students",
                edition: "5",
                author: "M Visser",
                dateOrdered: "1548161398701",
                orderStatus: "Book Collected"
              },
              {
                userId: "63f70088-2218-4a03-a206-48f576a553cc",
                orderId: "8dc1ab80-1e44-11e9-ab86-fb4cb32fd6ad",
                studentNumber: "dbdmpo001",
                name: "Mpodumo Doubada",
                email: "mkdoubada@gmail.com",
                univeristy: "UFS",
                cellNumber: "0726826064",
                address: "1 Palm Street Woodstock Cape Town",
                edition: "4",
                author: "J Kew",
                dateOrdered: "1548161539640",
                orderStatus: null
              },
              {
                userId: "6f1d9b77-2843-4b0b-b8bb-eb8a877f80a8",
                orderId: "02c7a6b0-17e1-11e9-8afc-3507af94e477",
                studentNumber: "123456",
                name: "Thanos-Titain",
                email: "thanos@example.com",
                univeristy: "UCT",
                cellNumber: "0147852369",
                address: "3FinityWay",
                ISBN: "23434",
                title: "Home Front",
                edition: "1st",
                author: "THQ",
                dateOrdered: "1547459079323",
                orderStatus: null
              },
              {
                userId: "6f1d9b77-2843-4b0b-b8bb-eb8a877f80a8",
                orderId: "032db310-18b3-11e9-a394-53f8bded1d33",
                studentNumber: "123456",
                name: "Thanos-Titain",
                email: "thanos@example.com",
                univeristy: "UCT",
                cellNumber: "0147852369",
                address: "3FinityWay",
                ISBN: "33424",
                title: "Rich Dad Poor Dad",
                edition: "3rd",
                author: "Robert Kawyasuki",
                dateOrdered: "1547549274305",
                orderStatus: null
              }
            ]
    
    
              expect(orderDetails.length).toBeGreaterThan(1);
            });
    
    
     
    

});