import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FormPage } from './Pages/FormPage/FormPage'
import { LoginPage } from './Pages/LoginPage/LoginPage'
import './App.css'

function App() {
  const [name, setName] = React.useState('')

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={<LoginPage setName={setName} name={name} />}
            path='/'
          ></Route>

          <Route element={<FormPage />} path='/form'></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
