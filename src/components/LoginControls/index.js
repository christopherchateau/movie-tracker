import React, { Component } from "react";
import PropTypes from "prop-types";
import "./LoginControls.css";

class LoginControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      name: ''
    }
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.props)
    //check user
    if (this.props.location.pathname === '/login') {
      this.loginUser()
    } else {
      this.signupUser()
    }
  }

  async loginUser() {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify({
          email: this.state.username,
          password: this.state.password
        }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      console.log('login', data);
    } catch (error) {
      console.log("error!");
    }
  }

  async signupUser() {
    try{
      const response = await fetch('http://localhost:3000/api/users/new', {
        method: 'POST',
        body: JSON.stringify({name: this.state.name, email: this.state.username, password: this.state.password}),
        headers: {'Content-Type': 'application/json'}
      })
      const data = await response.json()
      console.log('sign up', data)
    } catch (error) { console.log(error)}

    this.setState = { username: "", password: "" };
  };


  render() {
    return (
      <div className="LoginControls">
        <form className="login-form" onSubmit={this.handleSubmit}>
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
          <button
            className="submit-btn"
            disabled={!this.state.username || !this.state.password}
          >
            submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginControls;
