import uuid from "uuid";


describe("Staff are able to update the order status",  () => {



it("Updates the order status ", async () => {

    const orderDetails = {
        Item: {
            userId: "63f70088-2218-4a03-a206-48f576a553cc",
            orderId: "39c015d0-1e44-11e9-ab86-fb4cb32fd6ad",
            orderStatus: "Courier Booked",
            statusDate: Date.now()
        }
    }


    expect(orderDetails.Item.orderStatus).not.toBe(null);
    expect(orderDetails.Item.statusDate).not.toBe(null);

});



it("does not update the order status", async () => {
    const orderDetails = {
        Item: {
            userId: null,
            orderId: "39c015d0-1e44-11e9-ab86-fb4cb32fd6ad",
            orderStatus: null,
            statusDate: Date.now()
        }
    }


    expect(orderDetails.Item.orderStatus).toBe(null);
    expect(orderDetails.Item.userId).toBe(null);

});


});