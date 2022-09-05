export type User = {
  id: string
  name: string
  email: string
  role: string
  workOrders?: WorkOrders[]
  accounts?: []
  sessions?: []
  image?: string
}

export type Customer = {
  id: string
  firstName: string
  lastName: String
  companyName: String
  email: String
  adress: String
  city: String
  oib: String
  phoneNumber: String
  workOrders?: WorkOrders[]
}
export type WorkOrders = {
  id: string
  createdAt: string
  updatedAt: string
  title: string
  discription: string
  statusFlag: string
  customer?: Customer[]
  user: User[]
}
