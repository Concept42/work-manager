import { useState, useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import prisma from '../../lib/db'
import UserProfile from '../../components/Ui/UserProfile'
import SingleWorkOrder from '../../components/Ui/SingleWorkOrder'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id
  const workOrder = await prisma.workOrder.findUnique({
    where: {
      id,
    },
    include: {
      customer: true,
      user: true,
    },
  })

  return {
    props: { workOrder },
  }
}

const WorkorderDetails = ({ workOrder }) => {
  const [tab, setTab] = useState<boolean>(false)

  const handleClick = () => {
    setTab(!tab)
  }

  return (
    <>
      <main className='flex flex-col border-solid border-2 bg-white rounded-lg shadow-md p-10 w-full gap-20'>
        <section className='flex w-full h-full justify-between items-center'>
          <Link href={'/workorders'}>
            <button className='btn gap-2 w-fit text-white'>
              <ArrowBackIcon />
              Back
            </button>
          </Link>
        </section>
        <section>
          <SingleWorkOrder workOrder={workOrder} />
        </section>
      </main>
    </>
  )
}

export default WorkorderDetails
