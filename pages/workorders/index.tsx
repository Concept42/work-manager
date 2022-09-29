import React, { useState, useEffect } from 'react'
import AddButton from '../../components/Ui/AddButton'
import Modal from '../../components/Ui/Modal'
import { useAppSelector } from '../../utils/hooks'
import Loader from '../../components/Ui/Loader'
import SearchIcon from '@mui/icons-material/Search'
import { WorkOrders } from '../../slices/DbTypes'
import WorkOrderList from '../../components/LIsts/WorkOrderList'
import SearchBar from '../../components/Ui/SearchBar'
import useSearch from '../../utils/useSearch'

const WorkOrderPage: React.FC = () => {
  const contextWorkOrders: WorkOrders[] = useAppSelector((state) => state.workOrderContext.workOrders)
  console.log('customerWorkorders', contextWorkOrders)
  const handleOpen = useAppSelector((state) => state.themeContext.popupHandler)

  const { setSearchQuery, search } = useSearch()
  const [allWorkOrders, setAllWorkOrders] = useState<WorkOrders[]>([])

  useEffect(() => {
    setAllWorkOrders(contextWorkOrders)
  }, [contextWorkOrders])
  return (
    <>
      <div>
        <section>{handleOpen !== '' ? <Modal /> : ''}</section>
        <section className='flex flex-col border-solid border-2 bg-white rounded-lg shadow-md py-10 w-full'>
          <div className='flex justify-between pr-10 pb-16'>
            <SearchBar setSearchQuery={setSearchQuery} />
            <div className='flex relative ml-10 items-center justify-end  '></div>
            <AddButton add={'workOrder'} />
          </div>
          <div className='overflow-x-auto w-full px-10 '>
            <table className='table w-full'>
              <thead>
                <tr>
                  <th>Details</th>
                  <th>Created</th>
                  <th>Customer</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>User</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allWorkOrders &&
                  search(allWorkOrders)?.map((workOrders: WorkOrders, index: number) => {
                    return <WorkOrderList key={index} workOrders={workOrders} index={index} />
                  })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  )
}
export default WorkOrderPage
