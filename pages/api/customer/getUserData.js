import prisma from '../../../lib/db'

export default async function handler(req, res) {
  const users = await prisma.user.findMany({
    include: {
      workOrders: true,
    },
  })
  res.status(200).json(users)
}
