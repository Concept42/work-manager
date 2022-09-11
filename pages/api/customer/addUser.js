import prisma from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, role, email, password } = req.body
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password,
      },
    })
    res.status(200).json(user)
  }
}
