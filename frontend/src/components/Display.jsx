import React, { useState } from "react";
import { useSelector } from "react-redux";

function Display({ price }) {
  const saladDivIS = useSelector((state) => state.order.saladDiv);
  const cheeseDivIS = useSelector((state) => state.order.cheeseDiv);
  const baconDivIS = useSelector((state) => state.order.baconDiv);
  const meatDivIS = useSelector((state) => state.order.meatDiv);

  return (
    <div className="burgerOverflow">
      {price === "4.00" ? (
        <div className="burger">
          <div className="topBurger"></div>
          <div className="start">
            <strong>Please start adding Ingredients</strong>
          </div>
          <div className="botBurger"></div>
        </div>
      ) : (
        <div className="itemsDiv">
          <div className="topBurger"></div>

          {baconDivIS.map((_, index) => (
            <div key={index} className="bacon"></div>
          ))}
          {cheeseDivIS.map((_, index) => (
            <div key={index} className="cheese"></div>
          ))}
          {meatDivIS.map((_, index) => (
            <div key={index} className="meat"></div>
          ))}
          {saladDivIS.map((_, index) => (
            <div key={index} className="salad"></div>
          ))}

          <div className="botBurger"></div>
        </div>
      )}
    </div>
  );
}

export default Display;
