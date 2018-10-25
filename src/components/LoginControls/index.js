import React, { Component } from "react";
import PropTypes from "prop-types";
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

  handleSubmit = async (e) => {
    e.preventDefault();
    //check user
    try{
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        credentials: "same-origin",
        body: JSON.stringify({email: this.state.username, password: this.state.password}),
        headers: {'Content-Type': 'application/json'}
      })
      const data = await response.json()
      console.log(data)
      
    } catch (error) { console.log('error!')}

//new user
    // try{
    //   const response = await fetch('http://localhost:3000/api/users/new', {
    //     method: 'POST',
    //     body: JSON.stringify({name: 'Jon', email: this.state.username, password: this.state.password}),
    //     headers: {'Content-Type': 'application/json'}
    //   })
    //   const data = await response.json()
    //   console.log(data)
    // } catch (error) { console.log(error)}


    this.setState = { username: "", password: "" };
  };

  render() {
    return (
      <form className="login-controls" onSubmit={this.handleSubmit}>
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
        <button className="submit-btn" disabled={!this.state.username || !this.state.password}>
          submit
        </button>
      </form>
    );
  }
}

export default LoginControls;
