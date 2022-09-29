import prisma from '../../../lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req :NextApiRequest, res:NextApiResponse) {
    const { id } = req.body
  const customer = await prisma.customer.findUniqe({
    where: {
        id
      },
    include: {
      workOrders: true,
    },
  })
  res.status(200).json(customer)
}
