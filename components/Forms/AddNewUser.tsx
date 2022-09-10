import { useAppSelector, useAppDispatch } from '../../utils/hooks'
import { updateUserForm, addNewUser, updateUser, setEditMode } from '../../slices/userSlice'
import { handleUserPopup } from '../../slices/themeSlice'
import { useForm, SubmitHandler } from 'react-hook-form'
import type { EditMode } from '../../slices/userSlice'

interface FormInputs {
  id: string
  name: string
  email: string
  role: string
}

const AddNewUser: React.FC = () => {
  const contextUser: EditMode = useAppSelector((state) => state.userContext)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>()
  console.log(watch('name'))

  const formSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    dispatch(addNewUser(data))
    cancel()
    const response = await fetch(`/api/customer/addUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
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
    <form onSubmit={handleSubmit(formSubmit)} className='flex flex-col min-w-[500px]  text-font items-start '>
      <div className='flex flex-col w-full h-full justify-between gap-8'>
        <div className='form-control w-full max-w-2xl'>
          <input
            className='input input-bordered w-full max-w-lg'
            {...register('name', { required: 'Enter your name' })}
            type='text'
            placeholder='Ime i prezime*'
          />
        </div>
        <div className='form-control w-full max-w-2xl'>
          <input
            className='input input-bordered w-full max-w-lg'
            {...register('email', { required: true })}
            type='email'
            placeholder='Email*'
          />
        </div>
        <div className='form-control w-full max-w-lg'>
          <select
            className='select select-bordered'
            id='role'
            {...register('role', { required: true })}
            defaultValue=''
          >
            <option disabled>Odaberi ulogu</option>
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
              <button type='submit' className='btn btn-info btn-md'>
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
    </form>
  )
}

export default AddNewUser
