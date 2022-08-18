import prisma from '../../../lib/db'

export default async function handler(req, res) {
  const status = await prisma.status.findMany()
  res.status(200).json(status)
}
