import * as yup from 'yup'

export const userSchema = yup.object().shape({
  name: yup.string().required('Username is required'),
  email: yup.string().email('Email format is not valid').required('Email is required'),
  role: yup.string().required('Role is required'),
  password: yup.string().min(5, 'Password needs to be at least 5 characters long').required('Password is required'),
})
export const schema = yup.object().shape({
  name: yup.string().required('Username is required'),
  email: yup.string().email('Email format not valid').required('Email is required'),
  role: yup.string().required('Role is required'),
  title: yup.string().required('Title is required'),
  discription: yup.string().required('Description is required'),
  firstName: yup.string().required('Name is required'),
  lastName: yup.string().required('Last name is required'),
  companyName: yup.string().required('CompanyName is required'),
  adress: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  oib: yup.number().required('Oib is required'),
  phoneNumber: yup.number().required('Phone Number is required'),
})
