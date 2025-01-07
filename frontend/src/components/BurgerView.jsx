import React, { useEffect, useState } from "react";
// import Items from "./Items";
import "./BurgerView.css";
import Ingredients from "./Ingredients";
import Display from "./Display";
import OrderButton from "./OrderButton";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSaladDivs,
  resetBurger,
  addSalad,
  lessSalad,
  addBacon,
  lessBacon,
  addCheese,
  lessCheese,
  addMeat,
  lessMeat,
  updateBaconDivs,
  updateCheeseDivs,
  updateMeatDivs,
} from "../features/order/orderSlice";

function BurgerView() {
  const [saladDisable, setSaladDisable] = useState(true);
  const [cheeseDisable, setCheeseDisable] = useState(true);
  const [meatDisable, setMeatDisable] = useState(true);
  const [baconDisable, setBaconDisable] = useState(true);

  const dispatch = useDispatch();

  const {
    price,
    saladDiv,
    saladCount,
    cheeseDiv,
    cheeseCount,
    baconDiv,
    baconCount,
    meatDiv,
    meatCount,
  } = useSelector((state) => state.order);

  // const price = useSelector((state) => state.order.price);
  // const saladDivIS = useSelector((state) => state.order.saladDiv);
  // const saladCount = useSelector((state) => state.order.saladCount);
  // const cheeseDivIS = useSelector((state) => state.order.cheeseDiv);
  // const cheeseCount = useSelector((state) => state.order.cheeseCount);
  // const baconDivIS = useSelector((state) => state.order.baconDiv);
  // const baconCount = useSelector((state) => state.order.baconCount);
  // const meatDivIS = useSelector((state) => state.order.meatDiv);
  // const meatCount = useSelector((state) => state.order.meatCount);

  const reset = () => {
    dispatch(resetBurger());
  };
  const orderbtn = {
    saladCount,
    meatCount,
    baconCount,
    cheeseCount,
    price,
    reset,
  };

  useEffect(() => {
    if (saladCount == 0) {
      setSaladDisable(true);
    } else {
      setSaladDisable(false);
    }
  }, [saladCount]);
  useEffect(() => {
    if (baconCount === 0) {
      setBaconDisable(true);
    } else {
      setBaconDisable(false);
    }
  }, [baconCount]);
  useEffect(() => {
    if (cheeseCount === 0) {
      setCheeseDisable(true);
    } else {
      setCheeseDisable(false);
    }
  }, [cheeseCount]);
  useEffect(() => {
    if (meatCount === 0) {
      setMeatDisable(true);
    } else {
      setMeatDisable(false);
    }
  }, [meatCount]);

  const handleMoreSalad = () => {
    dispatch(addSalad());
    console.log(saladCount);
    const neArr = [...saladDiv, {}];
    dispatch(updateSaladDivs(neArr));
  };

  const handleLessSalad = () => {
    if (saladCount > 0) {
      dispatch(lessSalad());
      const updatedSaladDivs = saladDiv.slice(0, saladDiv.length - 1);
      dispatch(updateSaladDivs(updatedSaladDivs));
    }
  };
  const handleMoreBacon = () => {
    dispatch(addBacon());
    const newBaconDivs = [...baconDiv, {}];
    dispatch(updateBaconDivs(newBaconDivs));
  };

  const handleLessBacon = () => {
    if (baconCount > 0) {
      dispatch(lessBacon());
      const updatedBaconDivs = baconDiv.slice(0, baconDiv.length - 1);
      dispatch(updateBaconDivs(updatedBaconDivs));
    }
  };
  const handleMoreCheese = () => {
    dispatch(addCheese());
    const neArr = [...cheeseDiv, {}];
    dispatch(updateCheeseDivs(neArr));
  };

  const handleLessCheese = () => {
    if (cheeseCount > 0) {
      dispatch(lessCheese());
      const updatedCheeseDivs = cheeseDiv.slice(0, cheeseDiv.length - 1);
      dispatch(updateCheeseDivs(updatedCheeseDivs));
    }
  };
  const handleMoreMeat = () => {
    dispatch(addMeat());
    const neArr = [...meatDiv, {}];
    dispatch(updateMeatDivs(neArr));
  };

  const handleLessMeat = () => {
    if (meatCount > 0) {
      dispatch(lessMeat());
      const updatedMeatDivs = meatDiv.slice(0, meatDiv.length - 1);
      dispatch(updateMeatDivs(updatedMeatDivs));
    }
  };

  return (
    <div>
      <Display price={price} />
      <div className="orderDiv">
        <p>Current price: {price}</p>
        <div className="btnDiv">
          <Ingredients
            name="Salad"
            increase={handleMoreSalad}
            decrease={handleLessSalad}
            disable={saladDisable}
          />
          <Ingredients
            name="Bacon"
            increase={handleMoreBacon}
            decrease={handleLessBacon}
            disable={baconDisable}
          />
          <Ingredients
            name="Cheese"
            increase={handleMoreCheese}
            decrease={handleLessCheese}
            disable={cheeseDisable}
          />
          <Ingredients
            name="Meat"
            increase={handleMoreMeat}
            decrease={handleLessMeat}
            disable={meatDisable}
          />
        </div>
        <OrderButton btnprop={orderbtn} />
      </div>
    </div>
  );
}

export default BurgerView;
