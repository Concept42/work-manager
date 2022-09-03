import { useSelector } from 'react-redux'
import AddNewUser from '../Forms/AddNewUser'
import DeleteMessage from './DeleteMessage'

export const Modal = ({ children, title }) => {
  const handle = useSelector((state) => state.themeContext.popupHandler)

  return (
    <>
      {handle !== '' ? (
        <>
          <div className=' w-screen h-screen bg-gray-200 opacity-50 fixed left-0 top-0 z-20'></div>
          <div className='min-w-[600px] min-h-[500px] fixed top-[50%] left-[50%] mt-[-250px] ml-[-300px] bg-white opacity-100 z-50 rounded-2xl'>
            <div className='flex flex-col min-w-[600px] min-h-[500px] justify-center items-center gap-2'>
              <h1 className='text-[24px]'>
                {handle === 'ADD' ? 'Add new user' : ''}
                {handle === 'EDIT' ? 'Edit user' : ''}
                {handle === 'DELETE' ? '' : ''}
              </h1>
              {handle === 'ADD' ? <AddNewUser /> : ''}
              {handle === 'EDIT' ? <AddNewUser /> : ''}
              {handle === 'DELETE' ? <DeleteMessage /> : ''}
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  )
}
