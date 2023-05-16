import React from 'react';
import AddNote from './AddNote';
import NotesItem from './NotesItem';

export default function Notes() {
  return (
    <>
    <AddNote/>
    <div className="row">
    <NotesItem/>
    </div>
    </>
  )
}
