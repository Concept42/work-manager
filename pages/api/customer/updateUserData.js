import prisma from '../../../lib/db'

export default async function handler(req, res) {
  const { id, name, email } = req.body
  const customers = await prisma.customer.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      role,
    },
  })
  res.status(200).json(customers)
}
