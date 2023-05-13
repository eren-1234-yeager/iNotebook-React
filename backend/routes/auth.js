const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a User using: POST "/api/auth/createUser". No Login required

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
  let user = User.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).json({ error: "Email Already Exists, Please try again!" })
  }

  //Creating User
  try {
    const user = await User.create({
      "name": req.body.name,
      "email": req.body.email,
      "password": req.body.password
    })
    user.save()
    await res.send(user)
  } catch (e) {
    console.log(e.message)
    res.status(500).send("Some error occured check the console...")
  }
})

module.exports = router