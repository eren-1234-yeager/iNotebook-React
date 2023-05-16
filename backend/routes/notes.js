const express = require('express');
const Note = require('../models/Notes');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchdata');

//ROUTE:1 ==> To create a note
router.post('/createnote', [
  body('title').isLength({ min: 1 }),
  body('description').isLength({ min: 1 }),
], fetchuser, async (req, res) => {
  const errors = validationResult(req);

  //Check for errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description, tag } = req.body
  try {
    note = await Note.create({
      user: req.user.id,
      title: title,
      description: description,
      tag: tag
    })
    note.save()
    res.send(note)
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
})

//ROUTE:2 ==> To fetch all note of a user
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  const errors = validationResult(req);

  //Check for errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const notes = await Note.find({ user: req.user.id })
  return res.json(notes)
})

//ROUTE:3 ==> To Update a note
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const errors = validationResult(req);

  //Destructuring req.body...
  const {title,description,tag}= await req.body;
  //Check for errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
try{
  let newNote={};
  if(title){newNote.title=title}
  if(description){newNote.description=description}
  if(tag){newNote.tag=tag}


  let note=await Note.findById(req.params.id)
  //Check whether that note exists or not...
  if(!note){
    return res.status(404).send("Not find that note")
  }
  //Check if the user is updating his/her own note...
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not Allowed!")
  }
  
  //Updating Note
  note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
  res.send(note)
} catch (e) {
  return res.status(400).json({ error: e.message })
}
})

//ROUTE:4 ==> Deleting an existing note...
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  const errors = validationResult(req);
try{
  //Check for errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let note=await Note.findById(req.params.id)
  //Check whether that note exists or not...
  if(!note){
    return res.status(404).send("Not find that note")
  }
  //Check if the user is deleting his/her own note...
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not Allowed!")
  }
  
  //Deleting Note
  note=await Note.findByIdAndDelete(req.params.id)
  res.json({"Success":"Your note has been deleted..."})
} catch (e) {
  return res.status(400).json({ error: e.message })
}
})

module.exports = router