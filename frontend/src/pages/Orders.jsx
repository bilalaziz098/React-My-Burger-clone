import React from "react";
import "./Orders.css";
import { useDispatch, useSelector } from "react-redux";
import { updateArr } from "../features/order/orderSlice";
import axios from "axios";

function Orders() {
  const dispatch = useDispatch();
  const orderDetails1 = useSelector((state) => state.order.orderArr);
  // const user = useSelector((state) => state.auth.user.user);
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const orders = orderDetails1.filter(
    (order) => order.user_id === user.user.id
  );
  const userOrders = [...orders];

  console.log(userOrders);

  const handleDel = async (index) => {
    const updatedArr = [...orders];
    const del_id = updatedArr[index].order_id;
    try {
      await axios.delete(`http://localhost:3000/orders/${del_id}`);

      updatedArr.splice(index, 1);
      dispatch(updateArr({ updatedArr, user_id: user.user.id }));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
    console.log(userOrders[index]);

    console.log(del_id);
  };

  if (!userOrders.length) {
    return <div>No orders placed yet!</div>;
  }

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Hi {user.user.email}</h3>
      <h3>Your Order Details</h3>
      {userOrders.map((order, index) => (
        <div key={index} className="orderDetails">
          <p>Order No. {index + 1}</p>
          <div className="inDiv">
            <ul className="inUL">
              <span>Ingredients: </span>
              <li>Bacon: ({order.baconCount})</li>
              <li>Meat: ({order.meatCount})</li>
              <li>Salad: ({order.saladCount})</li>
              <li>Cheese: ({order.cheeseCount})</li>
            </ul>
            <p onClick={() => handleDel(index)}>Delete</p>
          </div>
          <h4 style={{ marginLeft: 40 }}>
            Total Price: {order.price ? order.price : "N/A"}
          </h4>
        </div>
      ))}
    </div>
  );
}

export default Orders;
