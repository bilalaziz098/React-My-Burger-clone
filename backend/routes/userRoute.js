// const express = require('express')
// const { Users } = require('../models');
// const router = express.Router()

// router.post('/auth', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required.' });
//   }

//   try {
//     const user = await Users.findOne({ where: { email, password } });
    
//     if (!user) {
//       return res.json({ message: 'Invalid credentials' });
//     }

//     return res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });

// router.post('/signup', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await Users.create({
//     email: email,
//     password: password
//   })


//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required.' });
//   }

//   try {
//     const user = await Users.findOne({ where: { email, password } });
    
//     if (!user) {
//       return res.json({ message: 'Invalid credentials' });
//     }

//     return res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });

// router.post('/orders', (req, res) => {
//   console.log(req.body)
// })

// module.exports = {router}