const schema = `

"""
An Order is placed by a student for a book or calculator. It is then updated by staff.
"""
type Order {
  """
  The order's unique ID
  """
  orderId: String!
  """
  The User's cognito sub
  """
  userId: String!
  """
  The students university studnet number
  """
  studentNumber: String
  """
  The students full name
  """
  name: String
  """
  the students email address
  """
  email: String
  """
  the students univeristy of study
  """
  univeristy: String
  """
  the students degree of study
  """
  degree: String
  """
  the students bursary 
  """
  bursary: String
  """
  the students cell phone number (RSA) 
  """
  cellNumber: String
  """
  the students delivery address 
  """
  address: String
  """
  the book's ISBN Number 
  """
  ISBN: String!
  """
  the title of the book 
  """
  title: String!
  """
  the edition of the book 
  """
  edition: String!
  """
  the author of the book 
  """
  author:  String!
  """
  the date the book was ordered
  """
  dateOrdered: String!
  """
  A depricated attribute
  """
  status: String
  """
  the status of the book
  """
  orderStatus: String
  """
  the the order date for exporting to an excel spreadsheet 
  """
  excelDate: String
  """
  the date the status was changed
  """
  statusDate: String


  updateDate: String
  ETA: String
  Vendor: String
  bookCondition: String
  deliveryMethod: String
  deliveryDate: String
  costPrice: String
  sellingPrice: String
  wayBillNumber: String
  courierCost: String
  leadTime: String
  
}
 

type Activities {
  orderId: String
  userId: String
  ISBN: String
  title: String
  edition: String
  author:  String
  dateChange: String
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

   


   type SuccessMessage {
     message : String
   }


    type Query {
      hello: String
      studentOrderList(userId: String!): [Order]
      viewOrder(orderId:String!,userId: String!): Order
      orderList: [Order]
      activityList: [Activities]
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
        costPrice: String,
        sellingPrice: String,
        wayBillNumber: String,
        leadTime: String): Order

      cancelOrder(
        orderId:String!,
        userId: String!,
        orderStatus: String):Order

      updateOrderStatus(
        orderId:String!,
        userId: String!,
        orderStatus: String
        email:String):Order
      
      updateOrderInfo(
        orderId:String!,
        userId: String!,
        ETA: String,
        Vendor: String,
        bookCondition: String,
        deliveryMethod: String,
        deliveryDate: String,
        costPrice: String,
        sellingPrice: String,
        wayBillNumber: String,
        courierCost: String,
        leadTime: String
      ): Order
      
      updateOrder(
        orderId: String!,
        userId: String!,
        ISBN: String,
        title: String,
        edition: String,
        author:  String,
      ): Order

    }
   
 `;

 export  {schema};
