import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialState = {
  username: "",
  password: "",
  isFetching: false,
};

const Login = (props) => {
  const [login, setLogin] = useState(initialState);

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin({ ...login, isFecthing: true });
    axiosWithAuth()
      .post("/api/login", login)
      .then((res) => {
        console.log("LOGIN RES", res);
        localStorage.setItem("token", res.data);
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
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          label="Username"
          type="text"
          name="username"
          placeholder="username"
          value={login.username}
          onChange={handleChange}
        />
        <br />
        <input
          label="Password"
          type="password"
          name="password"
          placeholder="password"
          value={login.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <button>Log In</button>
        {login.isFetching && "Please wait...logging you in"}
      </form>
      Don't have an account? <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default Login;
