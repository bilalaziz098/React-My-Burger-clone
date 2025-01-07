const express = require('express')
const { Orders, Users } = require('../models');
const orderRouter = express.Router()


// orderRouter.get('/orders', async (req, res) => {
//   const userID = req.query.id; 
//   try {
//     const user = await Users.findOne({
//       where: { id: userID }
//     });
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const orders = await Orders.findAll({ where: { user_id: userID } });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });


orderRouter.post('/orders', async (req, res) => {
  const { salad, meat, bacon, cheese, price, user_id } = req.body;
console.log('Request body:', req.body);
  try {
    const order = await Orders.create({
      salad,
      meat,
      bacon,
      cheese,
      price,
      user_id, 
    });

    return res.status(201).json({ message: 'Order created successfully', order:order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

orderRouter.delete('/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Orders.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.destroy();
    return res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});


module.exports = {orderRouter}

