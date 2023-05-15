import React, { useContext } from 'react'
import NotesContext from '../contexts/notes/noteContext'

export default function NotesItem() {
    const notes = useContext(NotesContext)
    return (
        <>
            <div className='my-3'>
                {notes.notes.map((note) => {
                    return <div class="card my-3">
                        <div class="card-header">
                            <div className="d-flex aligin-items-center">
                                {note.title}
                                <div className="icons">
                                    <i class="fa fa-trash-o  mx-3" style={{ color: "red", fontSize: "20px"}}></i>
                                    <i class="fa fa-edit" style={{ fontSize: "20px"}}></i>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>{note.description}</p>
                            </blockquote>
                        </div>

                    </div>
                })}

            </div>
        </>
    )
}
