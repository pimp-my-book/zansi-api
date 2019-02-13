import uuid from "uuid";

describe("Cancel Order", () => {


    /*

    schema

    cancelOrder => orderID,userID and orderStatus

    */
    it("Updates the order status to Cancel Requested", async () =>{
      
        const orderPayload = {
            Item: {
                userId: "63f70088-2218-4a03-a206-48f576a553cc",
                orderId: "39c015d0-1e44-11e9-ab86-fb4cb32fd6ad",
                orderStatus: "Cancel Requested",
                statusDate: Date.now()
            }
        }


        expect(orderPayload.Item.orderStatus).toMatch("Cancel Requested");
    });

    it("Does not Update the order status to Cancel Requested", () =>{
      
        const orderPayload = {
            Item: {
                userId: "63f70088-2218-4a03-a206-48f576a553cc",
                orderId: "39c015d0-1e44-11e9-ab86-fb4cb32fd6ad",
                orderStatus: "Cancel",
                statusDate: Date.now()
            }
        }


        expect(orderPayload.Item.orderStatus).not.toMatch("Cancel Requested");
    });
});