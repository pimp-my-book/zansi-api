const schema = `

   scalar Date

   type Student {
     id: Int!
     studentNumber: Int!
     name: String!
     email: String!
     univeristy: String!
     degree: String!
     currentYear: Int!
     bursary: String!
     cellNumber: Int!
     address: String!
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



   type Order {
     id: ID! 
     ISBN: Int!
     title: String!
     edition: String!
     author:  String!
     dateOrdered: Date
     status: String
     statusDate: Date
     ETA: String
     Vendor: [AllowedVendors]
     condition: [Conditions]
     deliveryMethod: [DeliveryType]
     deliveryDate: Date
     leadTime: String
   }

   type OrderList {
     orders: [Order!]!
   }


    type Query {
      hello: String
      studentOrder(id:ID!): Order
      viewOrder(id:ID!): Order
      orderList: OrderList!
    }

    type Mutation {
      placeOrder(ISBN: Int!,title: String!,edition: String!,author:String!): Order
      cancelOrder(id:ID!):Order
      updateOrderStatus(id:ID!,status:String,email:String):Order
      updateOrderInfo(id:ID!,ETA: String,Vendor: [AllowedVendors],condition: [Conditions],deliveryMethod: [DeliveryType], deliveryDate: Date): Order
      exportToExcel(id:ID!):Order
    }
   
 `;

 export  {schema};