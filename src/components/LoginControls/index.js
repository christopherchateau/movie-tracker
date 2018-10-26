import React, { Component } from "react";
import PropTypes from "prop-types";
import "./LoginControls.css";
import { logIn, saveName } from "../../actions";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class LoginControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
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
    this.setState({ errorMessage: "" });
    if (this.validateEmail() && this.validateInputLength("password")) {
      this.state.pathname === "/login" ? this.loginUser() : this.signupUser();
    }
  };

  validateEmail = () => {
    if (this.state.email.includes("@")) {
      return true;
    }
    this.setState({ errorMessage: "Please enter a valid e-mail address" });
    return false;
  };

  validateInputLength = inputType => {
    if (this.state[inputType].length > 5) {
      return true;
    } else {
      this.setState({
        errorMessage: `${inputType} must be at least 5 characters`
      });
    }
  };

  async loginUser() {
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
      this.props.saveName(data.data.name);
      this.props.handleLogin(true);
    } catch (error) {
      this.setState({ errorMessage: "Invalid e-mail/password" });
    }
  }

  async signupUser() {
    if (!this.validateInputLength("username")) {
      return;
    }
    const response = await fetch("http://localhost:3000/api/users/new", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.username,
        email: this.state.email,
        password: this.state.password
      }),
      headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    this.props.saveName(this.state.username);
    this.props.handleLogin(true);

    if (data.error && data.error.includes("already exists")) {
      this.setState({ errorMessage: "User account already exists!" });
    }
  }

  render() {
    return (
      <div className="LoginControls">
        {!this.props.loggedIn && (
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
                name="username"
                placeholder="username"
                className="username"
                value={this.state.username}
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
          </form>
        )}
        {this.props.loggedIn && (
          <div className="loggedIn">
            <Redirect to="/" />
          </div>
        )}
        <section>
          <p className="error-msg">{this.state.errorMessage}</p>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn
});

const mapDispatchToState = dispatch => ({
  handleLogin: loggedIn => dispatch(logIn(loggedIn)),
  saveName: username => dispatch(saveName(username))
});

export default connect(
  mapStateToProps,
  mapDispatchToState
)(LoginControls);
