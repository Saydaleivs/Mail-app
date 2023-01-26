import { AppBar, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'

export const TheNavbar = () => {
  const name = localStorage.getItem('name')
  const navigate = useNavigate()
  return (
    <>
      <AppBar position='static' className='flex'>
        <Typography
          variant='h6'
          style={{ textAlign: 'center' }}
          color='inherit'
          component='div'
        >
          Logged in as {name}
          <div
            className='signout-icon'
            onClick={() => {
              localStorage.clear()
              navigate('/')
            }}
          >
            <LogoutIcon />
          </div>
        </Typography>
      </AppBar>
    </>
  )
}
