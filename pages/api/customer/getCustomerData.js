import prisma from '../../../lib/db'

export default async function handler(req, res) {
  const customers = await prisma.customer.findMany({
    include: {
      workOrders: true,
    },
  })
  res.status(200).json(customers)
}
