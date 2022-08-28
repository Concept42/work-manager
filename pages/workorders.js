import { useState, useEffect } from 'react'
import { handleUserPopup, cancelButton } from '../slices/themeSlice'
import { useSelector, useDispatch } from 'react-redux'
import Popup from '../components/Utility/Popup'
import DeleteMessage from '../components/Ui/DeleteMessage'

function WorkOrders() {
  const themeContext = useSelector((state) => state.themeContext)
  const dispatch = useDispatch()
  const [handleOpen, setHandleOpen] = useState('')

  useEffect(() => {
    setHandleOpen(themeContext.popupHandler)
  }, [themeContext.popupHandler])

  return (
    <>
      <div>
        {handleOpen === 'ADD' ? (
          <Popup>
            <h1 className='mb-10'>Dodaj novu stranku</h1>
          </Popup>
        ) : (
          ''
        )}
      </div>
      <div>
        {handleOpen === 'DELETE CUSTOMER' ? (
          <Popup>
            <DeleteMessage handleDeleteCustomer={handleDeleteCustomer} />
          </Popup>
        ) : (
          ''
        )}
      </div>
      <div>
        {handleOpen === 'EDIT CUSTOMER' ? (
          <Popup>
            <h1 className='mb-10'>Izmjeni stranku</h1>
          </Popup>
        ) : (
          ''
        )}
        {handleOpen === 'DETAIL' ? <Popup></Popup> : ''}
      </div>
    </>
  )
}
export default WorkOrders
