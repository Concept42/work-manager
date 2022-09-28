import { useState, useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { Customer } from '../../slices/DbTypes';
import  { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch(`http://localhost:3000/api/customer/getCustomerById?${context.params?.customerId}`)
    let customer : Customer;
    try {
        customer = await res.json();  
    } catch (e) {
        console.log('Error', e);
    }

    if (!customer) {
        return {
            notFound: true,
        }
    }

    return {props: {customer}}
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
            <div>{customer?.firstName}</div>
        </section>
   
      </div>
    </>
  )
}

export default CustomerDetails
