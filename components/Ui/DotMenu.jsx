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

export default function CustomizedMenus(props) {
  const contextUsers = useSelector((state) => state.userContext.users)
  const [anchorEl, setAnchorEl] = useState(null)
  const [singleUser, setSingleUser] = useState([])

  const open = Boolean(anchorEl)
  const dispatch = useDispatch()

  useEffect(() => {
    if (props.singleUser) {
      setSingleUser({
        id: props.singleUser.id,
        name: props.singleUser.name,
        email: props.singleUser.email,
        role: props.singleUser.role,
      })
    }
  }, [props.singleUser])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEditMode = () => {
    dispatch(setDeleteComponentId(props.index))
    console.log('Component IDX: ', props.index)
    console.log('Context Users: ', contextUsers)
    dispatch(handleUserPopup('EDIT'))
    setAnchorEl(null)
    dispatch(
      updateUserForm({
        id: props.singleUser.id,
        name: props.singleUser.name,
        email: props.singleUser.email,
        role: props.singleUser.role,
        editMode: true,
      })
    )
  }

  const handleDeleteUser = () => {
    dispatch(handleUserPopup('DELETE'))
    setAnchorEl(null)
    dispatch(setDeleteComponentId(props.index))
    console.log('Component IDX: ', props.index)
    console.log('Context Users: ', contextUsers)
    dispatch(setDeleteUserId(singleUser.id))
  }

  return (
    <div>
      <div className='hover:bg-primary p-2 rounded-full' onClick={handleClick}>
        <MoreVertIcon />
      </div>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleDeleteUser} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
        <MenuItem onClick={handleEditMode} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
      </StyledMenu>
    </div>
  )
}
