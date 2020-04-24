import React, { useState } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialState = {
  username: "",
  password: "",
};

const Login = (props) => {
  const [login, setLogin] = useState(initialState);

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin({ ...login });
    axiosWithAuth()
      .post("/api/login", login)
      .then((res) => {
        // console.log("LOGIN RES", res);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubble-page");
      })
      .catch((err) => {
        console.log("LOGIN_ERROR", err);
      });
  };
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            placeholder="username"
            value={login.username}
            onChange={handleChange}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder="password"
            value={login.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
