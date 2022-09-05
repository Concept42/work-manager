import { useAppSelector, useAppDispatch } from '../../utils/hooks'
import { updateUserForm, addNewUser, updateUser, setEditMode } from '../../slices/userSlice'
import { handleUserPopup } from '../../slices/themeSlice'
import useForm from '../../utils/useForm'
import type { User } from '../../slices/DbTypes'

const AddNewUser: React.FC = () => {
  const contextUser: User = useAppSelector((state) => state.userContext)
  const dispatch = useAppDispatch()

  const [values, handleChange, handleRoleChange] = useForm()
  // const [newUser, setNewUser] = useState({
  //   id: '',
  //   name: '',
  //   email: '',
  //   role: '',
  //   workOrders: [],
  //   accounts: [],
  //   sessions: [],
  //   image: '',
  // })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.persist()
    dispatch(addUser(values))
    cancel()
    const response = await fetch(`/api/customer/addUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: values.id,
        name: values.name,
        email: values.email,
        role: values.role,
      }),
    })
  }

  const handleUpdateData = async (e) => {
    e.preventDefault()
    dispatch(updateUser(values))
    dispatch(setEditMode(true))
    cancel()
    const response = await fetch(`/api/customer/updateUserData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: values.id,
        name: values.name,
        email: values.email,
        role: values.role,
      }),
    })

    dispatch(
      updateUserForm({
        id: '',
        name: '',
        email: '',
        role: '',
        editMode: false,
      }),
    )
  }

  const cancel = () => {
    dispatch(handleUserPopup(''))
    dispatch(
      updateUserForm({
        id: '',
        name: '',
        email: '',
        role: '',
        editMode: false,
      }),
    )
  }

  return (
    <div className='flex flex-col min-w-[500px]  text-font items-start '>
      <div className='flex flex-col w-full h-full justify-between gap-8'>
        <div className='form-control w-full max-w-2xl'>
          <input
            className='input input-bordered w-full max-w-lg'
            name='name'
            type='text'
            placeholder='Ime i prezime*'
            onChange={handleChange}
            value={values.name}
          />
        </div>
        <div className='form-control w-full max-w-2xl'>
          <input
            className='input input-bordered w-full max-w-lg'
            name='email'
            type='email'
            placeholder='Email*'
            onChange={handleChange}
            value={values.email}
          />
        </div>
        <div className='form-control w-full max-w-lg'>
          <select className='select select-bordered' id='role' name='role' onChange={handleRoleChange} defaultValue=''>
            <option disabled value=''>
              Odaberi ulogu
            </option>
            <option value='USER'>Korisnik</option>
            <option value='ADMIN'>Administrator</option>
          </select>
        </div>
        <div className='flex justify-end gap-4'>
          {!contextUser.editMode ? (
            <>
              <button onClick={cancel} className='btn btn-outline btn-md'>
                Odustani
              </button>
              <button onClick={handleSubmit} className='btn btn-info btn-md'>
                Dodaj
              </button>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      {contextUser.editMode ? (
        <div className='flex gap-4 w-full justify-end'>
          <button onClick={cancel} className='btn btn-outline btn-md'>
            Odustani
          </button>
          <button onClick={handleUpdateData} className='btn btn-info btn-md'>
            Update
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default AddNewUser
