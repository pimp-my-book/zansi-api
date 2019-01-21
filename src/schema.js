const schema = `

   

   type Student {
     id: String!
     studentNumber: Int!
     name: String!
     email: String!
     univeristy: String!
     degree: String!
     currentYear: String!
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
     status: String!
     statusDate: String!
     ETA: String
     Vendor: [AllowedVendors]
     condition: [Conditions]
     deliveryMethod: [DeliveryType]
     deliveryDate: String!
     leadTime: String
     student: [Student]
   }

   type OrderList {
     orders: [Order!]!
   }

   type SuccessMessage {
     message : String
   }


    type Query {
      hello: String
      studentOrder(id:ID!): Order
      viewOrder(id:ID!): Order
      orderList: OrderList!
    }

    type Mutation {
      studentDetails(studentNumber: Int!,name: String!,email: String!,univeristy: String!,degree: String!,currentYear: Int!,bursary: String!,cellNumber: Int!,address: String!): Student
      placeOrder(ISBN: String!,title: String!,edition: String!,author:String!): Order
      cancelOrder(id:ID!):Order
      updateOrderStatus(id:ID!,status:String,email:String):Order
      updateOrderInfo(id:ID!,ETA: String,Vendor: [AllowedVendors],condition: [Conditions],deliveryMethod: [DeliveryType], deliveryDate: String!): Order
      exportToExcel: SuccessMessage
    }
   
 `;

 export  {schema};