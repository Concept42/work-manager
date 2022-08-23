import prisma from '../../../lib/db'

export default async function handler(req, res) {
  const { id, name, email, role } = req.body
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      id,
      name,
      email,
      role,
    },
  })
  res.status(200).json(user)
}
