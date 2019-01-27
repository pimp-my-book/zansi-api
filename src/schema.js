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
  excelDate: String
  status: String!
  statusDate: String!
  ETA: String
  Vendor: [AllowedVendors]
  condition: [Conditions]
  deliveryMethod: [DeliveryType]
  deliveryDate: String!
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
      placeOrder(ISBN: String!,title: String!,edition: String!,author:String!): Order
      cancelOrder(id:ID!):Order
      updateOrderStatus(id:ID!,status:String,email:String):Order
      updateOrderInfo(id:ID!,ETA: String,Vendor: [AllowedVendors],condition: [Conditions],deliveryMethod: [DeliveryType], deliveryDate: String!): Order

    }
   
 `;

 export  {schema};
