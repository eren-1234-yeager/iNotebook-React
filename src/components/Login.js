import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const onChange = async (e) => {
         setCredentials({...credentials,[e.target.name]:e.target.value})
        //  console.log({...credentials,[e.target.name]:e.target.value})
    }
    const login = async(e) => {
        e.preventDefault()
        // console.log(credentials)
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        }

        let response=await fetch('http://localhost:3000/api/auth/loginUser/',options)
        let data=await response.json()
        // console.log(data.authToken)
        localStorage.setItem('authToken',data.authToken)
        if(response.status===200){
            navigate('/')
        }
    }
    return (
        <>
            <div className="container">
                <h1 className='text-center'>Login to iNotebook</h1>
                <form onSubmit={login}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="exampleInputPassword1" onChange={onChange}/>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}
