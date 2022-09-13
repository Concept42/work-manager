export type User = {
  id: string
  name: string
  email: string
  role: string
  password: string
  workOrders?: WorkOrders[]
  accounts?: []
  sessions?: []
  image?: string
}

export type Customer = {
  id: string
  firstName: string
  lastName: string
  companyName: string
  email: string
  adress: string
  city: string
  oib: number
  phoneNumber: number
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
