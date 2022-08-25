import prisma from '../../../lib/db'

export default async function handler(req, res) {
  const { email } = req.body
  const users = await prisma.user.findMany({
    where: {
      email,
    },
    include: {
      workOrders: true,
    },
  })
  res.status(200).json(users)
}
