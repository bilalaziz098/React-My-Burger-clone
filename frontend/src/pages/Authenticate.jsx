import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Login from "../components/Login";
import { useNavigate } from "react-router-dom";

function Authenticate() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return <div>{!isAuthenticated && <Login />}</div>;
}

export default Authenticate;
