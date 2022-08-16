import prisma from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, role } = req.body
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        role,
      },
    })
    res.status(200).json(user)
  }
}
