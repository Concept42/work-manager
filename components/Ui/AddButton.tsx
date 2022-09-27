import { useAppDispatch } from '../../utils/hooks'
import { handleUserPopup } from '../../slices/themeSlice'

interface Props {
  add: string
}

function AddButton({ add }: Props) {
  const handleClick = () => {
    if (add === 'user') {
      dispatch(handleUserPopup('ADD USER'))
    }
    if (add === 'customer') {
      dispatch(handleUserPopup('ADDCUSTOMER'))
    }
    if (add === 'workOrder') {
      dispatch(handleUserPopup('ADDWORKORDER'))
    }
  }

  const dispatch = useAppDispatch()
  return (
    <button onClick={handleClick} className='btn gap-2 pr-7 text-white'>
      <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' viewBox='0 0 15 15'>
        <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
      </svg>
      Add new
    </button>
  )
}

export default AddButton
