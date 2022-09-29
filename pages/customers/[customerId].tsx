import { useState, useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import prisma from '../../lib/db'
import CustomerProfile from '../../components/Ui/CustomerProfile'
import WorkorderDetails from '../../components/Ui/SingleWorkOrder'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const customerId = context.params?.customerId
  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
    include: {
      workOrders: true,
    },
  })

  return {
    props: { customer },
  }
}

const CustomerDetails = ({ customer }) => {
  const [tab, setTab] = useState<boolean>(false)

  const handleClick = () => {
    setTab(!tab)
  }

  return (
    <>
      <main className='flex flex-col border-solid border-2 bg-white rounded-lg shadow-md p-10 w-full gap-20'>
        <section className='flex w-full h-full justify-between items-center'>
          <Link href={'/customers'}>
            <button className='btn gap-2 w-fit text-white'>
              <ArrowBackIcon />
              Back
            </button>
          </Link>
          <div className='tabs'>
            <a onClick={handleClick} className={!tab ? 'tab tab-bordered tab-active' : 'tab tab-bordered'}>
              Profile
            </a>
            <a onClick={handleClick} className={tab ? 'tab tab-bordered tab-active' : 'tab tab-bordered'}>
              Work Orders
            </a>
          </div>
        </section>
        <section>{!tab ? <CustomerProfile customer={customer} /> : <WorkorderDetails customer={customer} />}</section>
      </main>
    </>
  )
}

export default CustomerDetails
