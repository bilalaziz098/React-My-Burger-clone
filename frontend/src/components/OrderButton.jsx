import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderConfirm } from "../features/order/orderSlice";
import axios from "axios";
import "./OrderButton.css";
import { useNavigate } from "react-router-dom";
import { resetBurger } from "../features/order/orderSlice";

function OrderButton(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { baconCount, saladCount, meatCount, cheeseCount, price } =
    props.btnprop;
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.order);
  const [showModal, setShowModal] = useState(false);
  // const [showModal2, setShowModal2] = useState(false);
  const handleclick = () => {
    !isAuthenticated ? navigate("./auth") : setShowModal(true);
  };
  // const handleContinue = () => {
  //   setShowModal(false);
  //   setShowModal2(true);
  // };
  const orderConfirmed = async () => {
    if (!isAuthenticated) {
      alert("Please login to place an order!");
      return;
    }
    setShowModal(false);
    dispatch(resetBurger());
    try {
      const response = await axios.post("http://localhost:3000/orders", {
        salad: saladCount,
        meat: meatCount,
        bacon: baconCount,
        cheese: cheeseCount,
        price,
        user_id: user.user.id,
      });
      response.data;

      const orderId = response.data.order.order_id;

      dispatch(
        orderConfirm({
          baconCount,
          saladCount,
          meatCount,
          cheeseCount,
          price,
          user_id: user.user.id,
          order_id: orderId,
        })
      );
      "abhi order kia ", orders;
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => handleclick()}
          style={{
            color: !isAuthenticated ? "#888888" : "#000000",
            backgroundColor: !isAuthenticated ? "#c7c6c6" : "#dad735",
            padding: 20,
            cursor: "pointer",
          }}
          type="button"
        >
          {isAuthenticated ? "ORDER NOW" : "SIGN UP TO ORDER"}
        </button>
        {showModal && (
          <div className="modal">
            <div className="modalContainer">
              <h3>Your Order</h3>
              <p>A delicious burger with the following ingredients:</p>
              <div>
                <li>Bacon: {baconCount}</li>
                <li>Meat: {meatCount}</li>
                <li>Salad: {saladCount}</li>
                <li>Cheese: {cheeseCount}</li>
              </div>
              <h4>Total Price: {price}</h4>
              <p>Continue to Checkout?</p>
              <button className="btns" onClick={() => setShowModal(false)}>
                <strong style={{ color: " #944317", fontSize: 17 }}>
                  Cancel
                </strong>
              </button>
              <button onClick={orderConfirmed} className="btns">
                <strong style={{ color: "#5c9210", fontSize: 17 }}>
                  Continue
                </strong>
              </button>
            </div>
          </div>
        )}
        {/* {showModal2 && (
          <div className="modal2">
            <div className="modalContainer2">
              <h4>Enter your contact data</h4>
              <div className="inputFields">
                <input type="text" placeholder="Your Name"></input>
                <input type="text" placeholder="Address"></input>
                <input type="text" placeholder="Country"></input>
              </div>
              <h4>Total Price: {price}</h4>
              <button className="btns2" onClick={orderConfirmed}>
                <strong style={{ color: "#5c9210", fontSize: 17 }}>
                  Order
                </strong>
              </button>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
}

export default OrderButton;
