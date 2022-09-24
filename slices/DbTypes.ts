export type User = {
  id: string | undefined
  name: string | undefined
  email: string | undefined
  role: string | undefined
  password: string | undefined
  workOrders?: WorkOrders[] | undefined
  accounts?: [] | undefined
  sessions?: [] | undefined
  image?: string | undefined
}

export type Customer = {
  id: string
  firstName: string
  lastName: string
  companyName: string
  email: string
  adress: string
  city: string
  oib: number | null
  phoneNumber: number | null
  workOrders?: WorkOrders[]
}
export type WorkOrders = {
  id?: string
  createdAt?: string
  updatedAt?: string
  title?: string
  discription?: string
  statusFlag?: string
  customer?: Customer[]
  user?: User[]
}
