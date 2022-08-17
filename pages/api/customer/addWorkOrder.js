import prisma from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      createdAt,
      updatedAt,
      title,
      discription,
      statusFlag,
      customer,
      customerId,
      user,
      userId,
    } = req.body
    const workOrder = await prisma.workOrder.create({
      data: {
        createdAt,
        updatedAt,
        title,
        discription,
        statusFlag,
        customer,
        customerId,
        user,
        userId,
      },
    })
    res.status(200).json(workOrder)
  }
}
