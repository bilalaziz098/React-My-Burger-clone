const express = require('express')
const { Users } = require('../models');
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken'); 
const {validator, schema} = require('../middlewares/validators');


router.post('/auth', validator(schema.loginValidate), async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });
      if (!user) {
      return res.json({ message: 'Invalid credentials' });
    }
    console.log("login user is: ", user.id)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful',
      user: user
    });

  } catch (error) {
    console.error("Error is ", error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/signup', validator(schema.signupValidate), async (req, res) => {

  const { email, password } = req.body;

  try {
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt)

    const user = await Users.create({
      email: email,
      password: hashedpassword
    })

    return res.status(201).json({ message: 'Signup successful', user });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});


module.exports = {router}