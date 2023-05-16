import React,{useContext, useState} from 'react'
import NotesContext from '../contexts/notes/noteContext'

export default function AddNote() {
    const {addNote}=useContext(NotesContext)
    const [note, setNote] = useState({title:"",description:"",tag:"general"})

    const handleClick=(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className="container">
            <h1 className="text-center">Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Note Title:</label>
                    <input type="text" className="form-control" name="title" id="title" aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Note Description:</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
                </div>

                <button type="submit" className="btn btn-primary" id="addNote" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}
