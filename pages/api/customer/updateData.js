import prisma from '../../../lib/db'

export default async function handler(req, res) {
  const {
    id,
    firstName,
    lastName,
    companyName,
    email,
    adress,
    city,
    oib,
    phoneNumber,
  } = req.body
  const customers = await prisma.customer.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
      companyName,
      email,
      adress,
      city,
      oib,
      phoneNumber,
    },
  })
  res.status(200).json(customers)
}
