// const { Users, Orders } = require('./models'); 

// async function testAssociation() {
//   try {
  
//     const user = await Users.create({
//       email: 'testuser@example.com',
//       password: 'securepassword123'
//     });

//     console.log(`User created: ${user.email}`);
//     const order1 = await Orders.create({
//       salad: 2,
//       meat: 3,
//       bacon: 1,
//       cheese: 2,
//       price: 15,
//       user_id: user.id, 
//     });

//     const order2 = await Orders.create({
//       salad: 1,
//       meat: 2,
//       bacon: 2,
//       cheese: 1,
//       price: 12,
//       user_id: user.id, 
//     });

//     console.log(`Orders created for user: ${user.email}`);

//     const userWithOrders = await Users.findOne({
//       where: { id: user.id },
//       include: Orders 
//     });

//     console.log(`User: ${userWithOrders.email} has the following orders:`);
//     userWithOrders.Orders.forEach(order => {
//       console.log(`Order ID: ${order.order_id}, Price: ${order.price}`);
//     });
//   } catch (error) {
//     console.error('Error testing the association:', error);
//   }
// }

// testAssociation();
