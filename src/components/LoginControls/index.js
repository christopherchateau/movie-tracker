import React, { Component } from "react";
import "./LoginControls.css";

class LoginControls extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState = { username: "", password: "" };
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="username"
          placeholder="username"
          className="user-name"
          value={this.state.username}
          onChange={this.handleInputChange}
        />
        <input
          name="password"
          placeholder="password"
          className="password"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <button disabled={!this.state.username || !this.state.password}>
          submit
        </button>
      </form>
    );
  }
}

export default LoginControls;
