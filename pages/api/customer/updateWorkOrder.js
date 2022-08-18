import prisma from '../../../lib/db'

export default async function handler(req, res) {
  const { id, title, discription, statusFlag, customerId, userId } = req.body
  const workOrders = await prisma.workOrder.update({
    where: {
      id,
    },
    data: {
      id,
      title,
      discription,
      statusFlag,
      customerId,
      userId,
    },
  })
  res.status(200).json(workOrders)
}
