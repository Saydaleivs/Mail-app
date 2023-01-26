import * as React from 'react'
import { Autocomplete, Button, TextField } from '@mui/material'
import axios from 'axios'
import { TheNavbar } from '../../Components/TheNavbar'

export const FormPage = () => {
  const username = localStorage.getItem('name')
  const [receivedMessages, setReceivedMessages] = React.useState([])
  const [names, setNames] = React.useState([])
  const [message, setMessage] = React.useState({
    author: username,
    to: '',
    message: '',
  })

  const changeHandler = (e) => {
    if (e.target.role === 'option') {
      setMessage({ ...message, to: e.target.innerText })
    } else {
      setMessage({ ...message, [e.target.name]: e.target.value })
    }
  }

  const sendMessage = () => {
    if (message.message !== '' && message.to !== '') {
      axios({
        method: 'POST',
        params: { name: username },
        data: message,
        url: 'https://email-app-server.onrender.com/api/message/send',
      }).then(() => {
        setMessage({ ...message, message: '' })
      })
    } else {
      alert('Please fill the form first')
    }
  }

  function getData() {
    axios({
      method: 'GET',
      params: { name: username },
      url: 'https://email-app-server.onrender.com/api/users',
    }).then((res) => {
      setNames(...names, res.data.users)
      setReceivedMessages(res.data.messages.receivedMessages)
    })
  }

  React.useEffect(() => {
    getData()
  }, [])

  React.useEffect(() => {
    const interval = setInterval(() => {
      getData()
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <TheNavbar />
      <div className='form-wrapper'>
        <form noValidate autoComplete='off'>
          <Autocomplete
            options={names}
            getOptionLabel={(n) => n.name}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            sx={{ width: 300 }}
            onChange={changeHandler}
            renderInput={(p) => {
              return <TextField {...p} label='To:' />
            }}
          />
          <br />
          <TextField
            value={message.message}
            onChange={changeHandler}
            name='message'
            className='message-body'
            label='Message body'
          />
          <br />
          <Button
            className='send-button'
            style={{ marginTop: 10 }}
            variant='contained'
            onClick={sendMessage}
          >
            Send a message
          </Button>
        </form>

        {receivedMessages.map((m) => (
          <div key={m._id} className='card'>
            <div className='card__blur__fx'></div>
            <div className='content_to_front'>
              <h3>{m.from}</h3>
              <p>{m.message}</p>
            </div>
          </div>
        ))}
        <></>
      </div>
    </>
  )
}
