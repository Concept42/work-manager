import prisma from '../../lib/db'

export default async function handler(req, res) {
  debugger
  const newCustomerData = JSON.parse(req.body)
  const newCustomer = await prisma.customer.create({
    data: newCustomerData,
  })
  res.json(newCustomer)
}
