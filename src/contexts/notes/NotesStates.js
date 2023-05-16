import React, { useState } from 'react'
import NotesContext from './noteContext'


const NotesStates = (props) => {
  const host = "http://localhost:3000"
  const [notes, setNotes] = useState([])

  
  //To fetch all Notes
  const getNotes = async () => {
    //Options to Fetch Notes
    let options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1ZmFhNzdlNDcyY2RiNzU1YmI3Y2E1In0sImlhdCI6MTY4Mzk5MTE1OX0.3pb_lmlx1svCl1VC8k-632zPwa1YxXkP3WntyKeAnAU'
      },
    }

    //Fetching Notes
    let response = await fetch(`${host}/api/notes/fetchallnotes`, options)
    let data = await response.json()
    await setNotes(data)
  }

  //To add Note
  const addNote = async (title, description, tag) => {
    //Options for fetch
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1ZmFhNzdlNDcyY2RiNzU1YmI3Y2E1In0sImlhdCI6MTY4Mzk5MTE1OX0.3pb_lmlx1svCl1VC8k-632zPwa1YxXkP3WntyKeAnAU'
      },
      body: JSON.stringify({ title, description, tag })
    }

    //Adding Notes
    let response = await fetch(`${host}/api/notes/createnote`, options)
    let data = await response.json()
    setNotes(notes.concat(data))
  }

  //To delete Note
  const deleteNote = async (id) => {
    let url = `${host}/api/notes/deletenote/${id}`
    //Options to fetch
    let options = {
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1ZmFhNzdlNDcyY2RiNzU1YmI3Y2E1In0sImlhdCI6MTY4Mzk5MTE1OX0.3pb_lmlx1svCl1VC8k-632zPwa1YxXkP3WntyKeAnAU'
      }
    }

    //Deleting Note
    let response = await fetch(url, options)
    let data = await response
    
    setNotes(notes.filter((note)=>{return note._id!==id}))
  }
  return (
    <NotesContext.Provider value={{ notes, addNote, getNotes, deleteNote }}>
      {props.children}
    </NotesContext.Provider>
  )
}
export default NotesStates;