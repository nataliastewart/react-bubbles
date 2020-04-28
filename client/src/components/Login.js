import React from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

class Login extends React.Component {
  state = {
    login: {
      username: "",
      password: "",
    },
  };

  handleChange = (e) => {
    this.setState({
      login: { ...this.state.login, [e.target.name]: e.target.value },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post("/api/login", this.state.login)
      .then((res) => {
        console.log("LOGIN RES", res.data);
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/bubble-page");
      })
      .catch((err) => {
        console.log("LOGIN_ERROR", err);
      });
  };

  render() {
    return (
      <div>
        <h1>Welcome to the Bubble App!</h1>

        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              placeholder="username"
              value={this.state.login.username}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              placeholder="password"
              value={this.state.login.password}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <button>Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
