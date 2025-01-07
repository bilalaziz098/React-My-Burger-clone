import React, { useState } from "react";

import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const login = async (event) => {
    event.preventDefault();

    if (!name || !pass) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/signup", {
        email: name,
        password: pass,
      });
      navigate("/auth");
      // response;
      // if (err) err = response;
    } catch (err) {
      const error = err.response.data.message;
      setError(error);
    }
  };

  return (
    <>
      <div className="authDiv">
        <form className="formDiv" onSubmit={login}>
          <input
            type="text"
            value={name}
            placeholder="E-Mail Address"
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="password"
            value={pass}
            placeholder="Password"
            onChange={(event) => setPass(event.target.value)}
          />
          <button className="formBtn" type="submit">
            <strong style={{ color: "#5c9210", fontSize: 17 }}>Submit</strong>
          </button>
        </form>
        {error && (
          <p className="errorMessage" style={{ color: "red" }}>
            {error}
          </p>
        )}
      </div>
    </>
  );
}

export default Signup;
