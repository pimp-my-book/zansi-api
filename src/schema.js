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

  """
  the date a student updates the status
  """
  updateDate: String
  """
  the estimated date of delivery for an order
  """
  ETA: String
  """
  the vendor choosen for an order
  """
  Vendor: String
  """
  the condition of the book
  """
  bookCondition: String
  """
  the how the order will be delviered
  """
  deliveryMethod: String
  """
  the date the order was delivered
  """
  deliveryDate: String
  """
  the purchase price of the book
  """
  costPrice: String
  """
  the selling price of the book
  """
  sellingPrice: String
  """
  the couriers waybill number
  """
  wayBillNumber: String
  """
  the delviery charges to a book
  """
  courierCost: String
  """
  the how many days it took to deliver the book.
  """
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

   


   type SuccessMessage {
     message : String
   }


    type Query {
      hello: String
      """
      A list of all the student's orders
      """
      studentOrderList(userId: String!): [Order]
      """
      A query to view an indiviudal order
      """
      viewOrder(orderId:String!,userId: String!): Order
      """
      A query to get all the orders placed
      """
      orderList: [Order]
    }

    type Mutation {

      """ 
      Allows student place an order
      """
      placeOrder(
        ISBN: String!,
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

      """
      Allows student to request to cancel an order
      """
      cancelOrder(
        orderId:String!,
        userId: String!,
        orderStatus: String):Order

        """
       Allows staff to update the status of an order
      """
      updateOrderStatus(
        orderId:String!,
        userId: String!,
        orderStatus: String
        email:String):Order
      
        """
      Allows staff to update the order info of an order
      """
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
      
     

    }
   
 `;

 export  {schema};
