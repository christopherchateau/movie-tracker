import React, { Component } from "react";
import PropTypes from "prop-types";
import "./LoginControls.css";

class LoginControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      pathname: this.props.location.pathname,
      error: false,
      errorMessage: ""
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.pathname === "/login") {
      this.loginUser();
    } else {
      this.signupUser();
    }
  };

  validateEmail = email => {
    return !email.includes("@");
  };

  async loginUser() {
    if (this.validateEmail) {
      this.setState({ errorMessage: "Please enter a valid e-mail address" });
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
    } catch (error) {
      this.setState({ errorMessage: "Invalid e-mail/password" });
    }
  }

  async signupUser() {
    if (this.validateEmail) {
      this.setState({ errorMessage: "Please enter a valid e-mail address" });
      return;
    }
    let data;
    const response = await fetch("http://localhost:3000/api/users/new", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }),
      headers: { "Content-Type": "application/json" }
    });
    data = await response.json();
    if (data.error.includes("already exists")) {
      this.setState({ errorMessage: "User account already exists!" });
    }
    this.setState = { email: "", password: "", name: "" };
  }

  render() {
    return (
      <div className="LoginControls">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <input
            name="email"
            placeholder="email"
            className="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          {this.state.pathname === "/signup" && (
            <input
              name="name"
              placeholder="name"
              className="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          )}
          <input
            name="password"
            placeholder="password"
            className="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <button
            className="submit-btn"
            disabled={!this.state.email || !this.state.password}
          >
            submit
          </button>
          <p className="error-msg">{this.state.errorMessage}</p>
        </form>
      </div>
    );
  }
}

export default LoginControls;
