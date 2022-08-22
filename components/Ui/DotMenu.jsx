import * as React from 'react'
import { useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import AddNewUser from '../Forms/AddNewUser'

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
  const [handleOpen, setHandleOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <div className='hover:bg-primary p-2 rounded-full' onClick={handleClick}>
        <MoreVertIcon />
      </div>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={props.handleDeleteUser} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
        <MenuItem onClick={props.handleOpenPopup} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
      </StyledMenu>
    </div>
  )
}
