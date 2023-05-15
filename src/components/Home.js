import React, { useContext } from 'react'
import Notes from './Notes'

export default function Home() {
  return (
    <>
      <div className="container">
        <h1 className="text-center">Add a Note</h1>
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div className="container">
        <Notes/>
      </div>
      </>

      )
}
