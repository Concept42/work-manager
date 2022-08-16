import prisma from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, oib } = req.body
    const customer = await prisma.customer.create({
      data: {
        firstName,
        oib,
      },
    })
    res.status(200).json(customer)
  }
}
