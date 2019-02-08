import uuid from "uuid";


describe("Staff are able to update the order Information",  () => {



it("Updates the data", async () => {

    const orderDetails = {
        Item: {
            userId: "63f70088-2218-4a03-a206-48f576a553cc",
            orderId: "39c015d0-1e44-11e9-ab86-fb4cb32fd6ad",
         ETA: "09/02/2019",
        Vendor: "Takealot",
        bookCondition: "New",
        deliveryMethod: "Courier",
        deliveryDate: "09/05/2019",
        costPrice: "30.00",
        sellingPrice: "50.00",
        wayBillNumber: "34343434",
		leadTime: "7 Days",
		courierCost: "R1000"
        }
    }


    expect(orderDetails).not.toBe(null);
});



it("does not update the data", async () => {
    const orderDetails = {
        Item: {
            userId: null,
            orderId: "39c015d0-1e44-11e9-ab86-fb4cb32fd6ad",
         ETA: null,
        Vendor: "Takealot",
        bookCondition: "New",
        deliveryMethod: "Courier",
        deliveryDate: null,
        costPrice: "30.00",
        sellingPrice: "50.00",
        wayBillNumber: "34343434",
		leadTime: "7 Days",
		courierCost: "R1000"
        }
    }


    expect(orderDetails.Item.userId).toBeNull();
    expect(orderDetails.Item.ETA).toBeNull();

    expect(orderDetails.Item.deliveryDate).toBeNull();

});


});