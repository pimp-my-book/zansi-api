const schema = `


type Order {
  orderId: String!
  userId: String!
  studentNumber: String
  name: String
  email: String
  univeristy: String
  degree: String
  bursary: String
  cellNumber: String
  address: String

  ISBN: String!
  title: String!
  edition: String!
  author:  String!
  dateOrdered: String!
  status: String

  statusDate: String
  ETA: String
  Vendor: String
  bookCondition: String
  deliveryMethod: String
  deliveryDate: String
  costPrice: Float
  sellingPrice: Float
  wayBillNumber: String
  leadTime: String
  
}
 
   enum AllowedVendors {
    PMBPAROW
    PMPSTELLIES
    PMBUCT
    PMBHO
    PMBPTA
    PMBUFS
    ADAMS
    REHAB
    PROTEA
    VANSCHAIK
    TAKEALOT
    VITALSOURCE
    LOOT
    OTHER
   }

   enum Conditions {
     NEW
     USED
   }

   enum DeliveryType {
    COURIER
    PMBPAROW
    PMPSTELLIES
    PMBUCT
    PMBHO
    PMBPTA
    PMBUFS
    EMAIL
    PMBDELIVERY 
   }


   type SuccessMessage {
     message : String
   }


    type Query {
      hello: String
      studentOrderList(userId: String!): Order
      viewOrder(orderId:String!,userId: String!): Order
      orderList: [Order]
    }

    type Mutation {

      placeOrder(ISBN: String!,
        title: String!,
        edition: String!,
        author:String!,
        statusDate: String,
        ETA: String,
        Vendor: String,
        state: String,
        deliveryMethod: String,
        deliveryDate: String,
        costPrice: Float,
        sellingPrice: Float,
        wayBillNumber: String,
        leadTime: String): Order

      cancelOrder(id:ID!):Order
      updateOrderStatus(orderId:String!,userId: String!,status:String,email:String):Order
      
      updateOrderInfo(
        orderId:String!,
        userId: String!,
        ETA: String,
        Vendor: String,
        bookCondition: String,
        deliveryMethod: String,
        deliveryDate: String,
        costPrice: Float,
        sellingPrice: Float,
        wayBillNumber: String,
        leadTime: String
      ): Order
      
    }
   
 `;

 export  {schema};