import prisma from '../../../lib/db'

export default async function handler(req, res) {
  const { id } = req.body
  if (req.method === 'POST') {
    const workOrder = await prisma.workOrder.delete({
      where: {
        id,
      },
    })
    res.status(200).json(workOrder)
  }
}
