import React from "react"
import { Customer } from "../../slices/DbTypes"




const Profile = ({customer,tab}) =>   {
   


return(
    <div className="flex w-full h-full justify-center items-start">
        <div className="flex flex-col w-full h-full flex-[1] justify-center items-center border-solid border-r-2 gap-7">
        <div><div className="avatar">
  <div className="w-24 rounded-full">
    <img src="https://placeimg.com/192/192/people" />
  </div>
</div></div>
        <h2>{customer?.firstName + " " +  customer?.lastName}</h2>
        <h2><strong>{customer?.companyName}</strong></h2>
        
        </div>
        <div className="flex flex-col flex-[4] w-full h-full justify-start pl-20 gap-10">
            <h1 className="border-solid border-b-2 text-2xl">Information</h1>
         <div className="flex flex-col gap-7">
            <div>
                <h1><strong>Email: </strong></h1>
            <h1> {customer.email}</h1>
            </div>
            <div>
                <h1><strong>Address: </strong></h1>
            <h1> {customer.adress}</h1>
            </div>
            <div>
                <h1><strong>City: </strong></h1>
            <h1> {customer.city}</h1>
            </div>
            <div>
                <h1><strong>OIB: </strong></h1>
            <h1> {customer.oib}</h1>
            </div>
            <div>
                <h1><strong>Phone Number: </strong></h1>
            <h1> {customer.phoneNumber}</h1>
            </div>
            
         </div>
          
               
           
            
        </div>
    </div>
)
}

export default Profile