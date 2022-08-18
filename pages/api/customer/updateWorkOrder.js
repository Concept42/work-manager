import prisma from '../../../lib/db'

export default async function handler(req, res) {
  const { id, updatedAt, title, discription, statusFlag, customerId, userId } =
    req.body
  const workOrders = await prisma.workOrder.update({
    where: {
      id,
    },
    data: {
      id,
      updatedAt,
      title,
      discription,
      statusFlag,
      customerId,
      userId,
    },
  })
  res.status(200).json(workOrders)
}
