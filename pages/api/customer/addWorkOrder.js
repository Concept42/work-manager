import prisma from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
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
