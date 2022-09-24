import * as yup from 'yup'

export const userSchema = yup.object().shape({
  name: yup.string().required('Username is required'),
  email: yup.string().email('Email format is not valid').required('Email is required'),
  role: yup.string().required('Role is required'),
  password: yup.string().min(5, 'Password needs to be at least 5 characters long').required('Password is required'),
})
export const userYup = yup.object().shape({
  name: yup.string(),
  email: yup.string(),
  role: yup.string(),
  password: yup.string(),
})
export const customerSchema = yup.object().shape({
  email: yup.string().email('Email format not valid').required('Email is required'),

  firstName: yup.string().required('Name is required'),
  lastName: yup.string().required('Last name is required'),
  companyName: yup.string().required('CompanyName is required'),
  adress: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  oib: yup.number().typeError('Oib must be a number').required('Oib is required'),
  phoneNumber: yup.number().typeError('Oib must be a number').required('Phone Number is required'),
})
export const workOrderSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  discription: yup.string().required('Description is required'),
  statusFlag: yup.string().required('Status is required'),
})
