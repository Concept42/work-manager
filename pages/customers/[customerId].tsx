import { useState, useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from "next";

export const getServerSideProps :GetServerSideProps = async (context) =>{
  const customerId = context.params?.customerId
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/customer/getCustomerById`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( customerId ),
  
  } 
  )
    const customer = JSON.parse(JSON.stringify( res ))

  
  return {
    props: {
      customer 
  }
}
}


const CustomerDetails = ({customer}) => {



  return (
    <>
      <div>
        <section className='flex flex-col border-solid border-2 bg-white rounded-lg shadow-md py-10 w-full'>
            <Link href={"/customers"}>
            <button className="btn gap-2 w-fit ml-10 text-white">
  <ArrowBackIcon/>
  Back
</button>
            </Link>
          <button onClick={()=> console.log("customer: ",customer)}>LOG</button>
        </section>
   
      </div>
    </>
  )
}

export default CustomerDetails
