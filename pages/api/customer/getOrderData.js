import prisma from '../../../lib/db'

export default async function handler(req, res) {
  const workOrders = await prisma.workOrder.findMany({
    include: {
      user: true,
      customer: true,
    },
  })
  res.status(200).json(workOrders)
}
