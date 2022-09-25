import * as React from 'react'
import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import { useAppDispatch } from '../../utils/hooks'
import { updateUserForm, setComponentId, setUserId, setEditMode } from '../../slices/userSlice'
import { handleUserPopup } from '../../slices/themeSlice'
import {
  setDeleteCustomerComponentId,
  setDeleteCustomerId,
  updateCustomerForm,
  setCustomerEditMode,
} from '../../slices/customerSlice'
import type { User, Customer } from '../../slices/DbTypes'

const StyledMenu = styled((props: any) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 20,
    backgroundColor: '#21212C',
    minWidth: 150,
    color: 'white',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 30,
        color: 'white',
        marginRight: theme.spacing(2),
      },
    },
  },
}))

interface Props {
  singleUser?: User
  singleCustomer?: Customer
  index?: number
  customerIndex?: number
}

export default function DotMenu(props: Props) {
  const singleUser = props.singleUser
  const singleCustomer = props.singleCustomer

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const dispatch = useAppDispatch()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleUserEditMode = () => {
    dispatch(handleUserPopup('EDIT'))
    dispatch(setComponentId(props.index))
    setAnchorEl(null)
    dispatch(
      updateUserForm({
        id: singleUser.id,
        name: singleUser.name,
        email: singleUser.email,
        password: singleUser.password,
        role: singleUser.role,
        workOrders: singleUser.workOrders,
        accounts: singleUser.accounts,
        sessions: singleUser.sessions,
        image: singleUser.image,
      }),
    )
    dispatch(setEditMode(true))
  }
  const handleCustomerEditMode = () => {
    dispatch(handleUserPopup('EDITCUSTOMER'))
    dispatch(setDeleteCustomerComponentId(props.customerIndex))
    setAnchorEl(null)
    dispatch(
      updateCustomerForm({
        id: singleCustomer.id,
        firstName: singleCustomer.firstName,
        lastName: singleCustomer.lastName,
        companyName: singleCustomer.companyName,
        email: singleCustomer.email,
        adress: singleCustomer.adress,
        city: singleCustomer.city,
        oib: singleCustomer.oib,
        phoneNumber: singleCustomer.phoneNumber,
      }),
    )
    dispatch(setCustomerEditMode(true))
  }

  const handleDeleteUser = () => {
    dispatch(handleUserPopup('DELETE USER'))
    setAnchorEl(null)
    dispatch(setComponentId(props.index))
    dispatch(setUserId(singleUser.id))
  }
  const handleDeleteCustomer = () => {
    dispatch(handleUserPopup('DELETE CUSTOMER'))
    setAnchorEl(null)
    dispatch(setDeleteCustomerComponentId(props.customerIndex))
    dispatch(setDeleteCustomerId(singleCustomer.id))
  }

  return (
    <div>
      <button className='flex justify-start' onClick={handleClick}>
        <MoreVertIcon />
      </button>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {singleUser ? (
          <MenuItem onClick={handleDeleteUser} disableRipple>
            <DeleteIcon />
            Delete User
          </MenuItem>
        ) : (
          <MenuItem onClick={handleDeleteCustomer} disableRipple>
            <DeleteIcon />
            Delete
          </MenuItem>
        )}
        {singleUser ? (
          <MenuItem onClick={handleUserEditMode} disableRipple>
            <EditIcon />
            Edit
          </MenuItem>
        ) : (
          <MenuItem onClick={handleCustomerEditMode} disableRipple>
            <EditIcon />
            Edit
          </MenuItem>
        )}
      </StyledMenu>
    </div>
  )
}
