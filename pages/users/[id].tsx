import { useState, useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import prisma from '../../lib/db'
import UserProfile from '../../components/Ui/UserProfile'
import WorkorderDetail from '../../components/Ui/WorkorderDetail'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const back = context.req.headers.referer
  const id = context.params?.id
  const user = await prisma.user.findUnique({
    where: {
      email: id,
    },
    include: {
      workOrders: true,
    },
  })

  return {
    props: { user, back },
  }
}

const CustomerDetails = ({ user, back }) => {
  const [tab, setTab] = useState<boolean>(false)
  const router = useRouter()

  const handleClick = () => {
    setTab(!tab)
  }

  return (
    <>
      <main className='flex flex-col border-solid border-2 bg-white rounded-lg shadow-md p-10 w-full gap-20'>
        <section className='flex w-full h-full justify-between items-center'>
          <Link href={back}>
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
        <section>{!tab ? <UserProfile user={user} /> : <WorkorderDetail workOrder={user} />}</section>
      </main>
    </>
  )
}

export default CustomerDetails
