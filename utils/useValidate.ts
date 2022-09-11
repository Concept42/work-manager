import { useState, useEffect } from 'react'

export interface formFields {
  id?: string | number
  name?: string
  email?: string
  role?: string
  image?: string
  title?: string
  discription?: string
  statusFlag?: string
  customerId?: string | number
  userId?: string | number
  firstName?: string
  lastName?: string
  companyName?: string
  adress?: string
  city?: strings
  oib?: number
  phoneNumber?: number
}

const useValidate = <Object>(formData: formFields) => {
  const [data, setData] = useState(formData)
  const [errors, setErrors] = useState<formFields>({})
  const [isValid, setIsValid] = useState<boolean>(false)

  useEffect(() => {
    setData(formData)
    if ((data.name = '')) {
      setErrors({ ...errors, [errors.name]: 'Name cant be empty' })
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [formData, data, errors])
  return [errors]
}

export default useValidate
