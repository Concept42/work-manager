import prisma from '../../../lib/db'

export default async function handler(req, res) {
  const customers = await prisma.customer.update({
    where: {
      id: '',
    },
    data: {
      firstName: '',
      oib: '',
    },
  })
  res.status(200).json(customers)
}
