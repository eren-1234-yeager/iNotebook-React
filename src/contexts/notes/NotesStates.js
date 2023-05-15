import React,{useState} from 'react'
import NotesContext from './noteContext'


const NotesStates=(props)=>{
    const data=[
        {
          "_id": "64620a92913288a79bd99a1c",
          "user": "645faa77e472cdb755bb7ca5",
          "title": "admin",
          "description": "i am admin",
          "tag": "General",
          "date": "2023-05-15T10:33:54.323Z",
          "__v": 0
        },
        {
          "_id": "64620a92913288a79bd99a1f",
          "user": "645faa77e472cdb755bb7ca5",
          "title": "admin",
          "description": "i am admin",
          "tag": "General",
          "date": "2023-05-15T10:33:54.773Z",
          "__v": 0
        },
        {
          "_id": "64620a92913288a79bd99a22",
          "user": "645faa77e472cdb755bb7ca5",
          "title": "admin",
          "description": "i am admin",
          "tag": "General",
          "date": "2023-05-15T10:33:54.975Z",
          "__v": 0
        },
      ]
      const [notes, setNotes] = useState(data)
    return(
    <NotesContext.Provider value={{notes,setNotes}}>
        {props.children}
    </NotesContext.Provider>
    )
}
export default NotesStates;