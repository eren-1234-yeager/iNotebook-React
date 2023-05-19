import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  let navigate=useNavigate()
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    console.log({ ...credentials, [e.target.name]: e.target.value })
  }
  const signup = async (e) => {
    e.preventDefault()
    console.log(credentials)
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    }

    let response = await fetch('http://localhost:3000/api/auth/createUser/', options)
    let data = await response.json()
    console.log(data.authToken)
    if (response.status === 200) {
      localStorage.setItem('authToken', data.authToken)
      navigate('/')
    }
  }
  return (
    <>
      <div className="container">
        <h1 className='text-center'>Signup to iNotebook</h1>
        <form onSubmit={signup}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name:</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="name" minLength={3} onChange={onChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" minLength={5} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name="password" className="form-control" id="exampleInputPassword1" minLength={7} onChange={onChange} />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}
