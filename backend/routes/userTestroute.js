const express = require('express')
const { Users } = require('../models');
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken'); 
const {validator, schema} = require('../middlewares/validators');
const dotenv = require('dotenv');
const { userAuth } = require('../middlewares/auth');
dotenv.config();
const SECRET = process.env.JWT_SECRET

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

    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' });
    user.token = token

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3600000
    })

    return res.status(200).json({
      message: 'Login successful',
      token, 
      user: { id: user.id, email: user.email },
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