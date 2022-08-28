import * as React from 'react'
import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateUserForm,
  setDeleteComponentId,
  setDeleteUserId,
} from '../../slices/userSlice'
import { handleUserPopup, cancelButton } from '../../slices/themeSlice'
import {
  setDeleteCustomerComponentId,
  setDeleteCustomerId,
  updateCustomerForm,
} from '../../slices/customerSlice'

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
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
    backgroundColor: '#263238',
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

export default function DotMenu(props) {
  const singleUser = props.singleUser
  const singleCustomer = props.singleCustomer

  const popupHandler = useSelector((state) => state.themeContext.popupHandler)
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)
  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleUserEditMode = () => {
    dispatch(setDeleteComponentId(props.index))
    dispatch(handleUserPopup('EDIT'))
    setAnchorEl(null)
    dispatch(
      updateUserForm({
        id: singleUser.id,
        name: singleUser.name,
        email: singleUser.email,
        role: singleUser.role,
        editMode: true,
      })
    )
  }
  const handleCustomerEditMode = () => {
    dispatch(setDeleteCustomerComponentId(props.customerIndex))
    dispatch(handleUserPopup('EDIT CUSTOMER'))
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
        editMode: true,
      })
    )
  }

  const handleDeleteUser = () => {
    dispatch(handleUserPopup('DELETE'))
    setAnchorEl(null)
    dispatch(setDeleteComponentId(props.index))
    dispatch(setDeleteUserId(singleUser?.id))
  }
  const handleDeleteCustomer = () => {
    dispatch(handleUserPopup('DELETE CUSTOMER'))
    setAnchorEl(null)
    dispatch(setDeleteCustomerComponentId(props.customerIndex))
    dispatch(setDeleteCustomerId(singleCustomer.id))
  }

  return (
    <div>
      <div className='hover:bg-primary p-2 rounded-full' onClick={handleClick}>
        <MoreVertIcon />
      </div>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {singleUser ? (
          <MenuItem onClick={handleDeleteUser} disableRipple>
            <DeleteIcon />
            Delete
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
