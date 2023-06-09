const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY="ollyviya";
var fetchuser = require('../middleware/fetchdata');

// ROUTE:1==>Create a User using: POST "/api/auth/createUser". No Login required

router.post('/createUser', [
  body('name').isLength({ min: 3 }),//Checking Validation for name
  body('email').isEmail().isLength({ min: 5 }),//Checking Validation for email
  body('password').isLength({ min: 7 })//Checking Validation for password
], async (req, res) => {
  const errors = validationResult(req);

  //Check for errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Check whether email exists or not
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).json({ error: "Email Already Exists, Please try again!" })
  }

  try {
    //Password Hashing
    const salt= await bcrypt.genSalt(10)
    const secPass= await bcrypt.hash(req.body.password,salt)
    //Creating User
    const user = await User.create({
      name: req.body.name,
      email:req.body.email,
      password:secPass
    })
    user.save()
    
    const data={
      user:{
        id:user.id
      }
    }
    const authToken=jwt.sign(data,JWT_KEY)
    return res.json({authToken:authToken})

  } catch (e) {
    console.log(e.message)
    res.status(500).send("Some error occured check the console...")
  }
})

// ROUTE:2==> Login a User using: POST "/api/auth/loginUser". No Login required
router.post('/loginUser', [
  body('email').isEmail().isLength({ min: 5 }),//Checking Validation for email
  body('password').isLength({ min: 7 })//Checking Validation for password
], async (req, res) => {
  const errors = validationResult(req);

  //Check for errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
try{
  const {email,password}=req.body
  //Check whether email exists or not
  let user = await User.findOne({ email:email })
  if (!user) {
    return res.status(401).json({ error: "Please enter correct credentials!" })
  }

  const passwordCompare= await bcrypt.compare(password,user.password)
  if(!passwordCompare){
    return res.status(401).json({ error: "Please enter correct credentials!" })
  }

      
  const data={
    user:{
      id:user.id
    }
  }
  const authToken=jwt.sign(data,JWT_KEY)
  res.json({authToken:authToken})
}catch (e) {
  console.log(e.message)
  res.status(500).send("Some error occured check the console...")
}
})


router.post('/createUser', async (req, res) => {
  const errors = validationResult(req);

  //Check for errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
})
// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router