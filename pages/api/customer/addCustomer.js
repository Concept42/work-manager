import prisma from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      firstName,
      lastName,
      companyName,
      email,
      adress,
      city,
      oib,
      phoneNumber,
    } = req.body
    const customer = await prisma.customer.create({
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
    res.status(200).json(customer)
  }
}
