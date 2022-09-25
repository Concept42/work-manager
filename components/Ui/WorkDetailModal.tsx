import Card from './Card'
import CloseIcon from '@mui/icons-material/Close'
import { Customer, WorkOrders } from '../../slices/DbTypes'
import { handleDetailsPopup, handleUserPopup } from '../../slices/themeSlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { useEffect, useState } from 'react'

interface Props {
  singleCustomer?: Customer
  customerWorkOrders?: WorkOrders[]
}

type workOrder = WorkOrders[]

export default function WorkDetailModal(props: Props) {
  const [workOrders, setWorkOrders] = useState<workOrder>([])
  const [handler, setHandler] = useState<string>('')

  const singleCustomer = props.singleCustomer
  const detailWorkOrder = useAppSelector((state) => state.workOrderContext.singleWorkOrder)
  const detailCustomer = useAppSelector((state) => state.customerContext.detailCustomer)
  const popupHandler = useAppSelector((state) => state.themeContext.detailsPopupHandler)
  const dispatch = useAppDispatch()
  console.log('detailCustomer', detailCustomer)

  useEffect(() => {
    setHandler(popupHandler)
  }, [popupHandler])

  useEffect(() => {
    setWorkOrders(singleCustomer.workOrders)
  }, [singleCustomer])

  const handleClick = () => {
    setWorkOrders(singleCustomer.workOrders)
    dispatch(handleDetailsPopup(''))
  }
  console.log('on modal:', detailWorkOrder)
  return (
    <>
      {handler === 'WORKORDERS' ? (
        <>
          <div className=' w-screen h-screen bg-gray-200 opacity-50 fixed left-0 top-0 z-20'></div>
          <div className='flex flex-col justify-start items-center min-w-[80%] min-h-[80%] fixed top-[10%] left-[10%]   bg-white opacity-100 z-50 rounded-2xl p-10 '>
            <div onClick={handleClick} className='absolute right-0 top-0 text-[50px] '>
              <CloseIcon fontSize='inherit' />
            </div>

            <div className='grid grid-cols-4 gap-10 p-10'>
              {workOrders?.map((singleWorkOrder, index) => {
                return <Card key={index} singleWorkOrder={singleWorkOrder} />
              })}
            </div>
          </div>
        </>
      ) : (
        ''
      )}
      {handler === 'DETAIL' ? (
        <>
          <div className=' w-screen h-screen bg-gray-200 opacity-50 fixed left-0 top-0 z-20'></div>
          <div className='flex flex-col justify-start items-center min-w-[80%] min-h-[80%] fixed top-[10%] left-[10%]   bg-white opacity-100 z-50 rounded-2xl p-10 '>
            <div onClick={handleClick} className='absolute right-0 top-0 text-[50px] '>
              <CloseIcon fontSize='inherit' />
            </div>
            <div className='flex flex-col justify-start items-center w-full h-full '>
              <div className='text-[36px]'>Title:{detailWorkOrder.title} </div>
            </div>

            <div className='grid grid-cols-4 gap-10 p-10'></div>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  )
}
