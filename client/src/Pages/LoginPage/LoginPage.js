import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const LoginPage = ({ setName, name }) => {
  const navigate = useNavigate()

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const sendName = () => {
    axios({
      method: 'GET',
      params: { name },
      url: 'https://email-app-server.onrender.com/api/login',
    }).then((res) => {
      localStorage.setItem('name', res.data.name)
      setName('')
      navigate('/form')
    })
  }
  return (
    <div className='login-wrapper'>
      <input
        type='text'
        onChange={handleChange}
        value={name}
        placeholder='Your name'
        className='login-input'
      />
      <Button onClick={sendName} variant='contained'>
        Login
      </Button>
    </div>
  )
}
