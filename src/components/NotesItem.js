import React, { useContext,useEffect } from 'react'
import NotesContext from '../contexts/notes/noteContext'

export default function NotesItem() {
    const {notes,getNotes,deleteNote}= useContext(NotesContext)
    useEffect(() => {
      getNotes()
    }, [])
    
    const handleDeleteNote=(id)=>{
        deleteNote(id)
    }
    return (
        <>
            <div className='my-3'>
                {notes && notes.map((note) => {
                    return <div key={note._id} className="card my-3">
                        <div className="card-header">
                            <div className="d-flex aligin-items-center">
                                {note.title}
                                <div className="icons">
                                    <i className="fa fa-trash-o  mx-3" style={{ color: "red", fontSize: "20px"}} onClick={()=>handleDeleteNote(note._id)}></i>
                                    <i className="fa fa-edit" style={{ fontSize: "20px"}}></i>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <p>{note.description}</p>
                            </blockquote>
                        </div>

                    </div>
                })}

            </div>
        </>
    )
}