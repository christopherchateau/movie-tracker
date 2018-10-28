import React, { Component } from "react";
import PropTypes from "prop-types";
import "./LoginControls.css";
import { logIn, saveUserData, toggleFavorite } from "../../actions";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as fetch from "../../utilities/fetch.js";

export class LoginControls extends Component {
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

  handleSubmit = e => {
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
    if (this.state[inputType].length > 2) {
      return true;
    } else {
      this.setState({
        errorMessage: `${inputType} must be at least 3 characters`
      });
    }
  };

  loginUser = async () => {
    try {
      const { email, password } = this.state;
      const fetchUser = await fetch.fetchLoginUser(email, password);

      this.props.saveUserData(fetchUser.data.name, fetchUser.data.id);
      this.props.handleLogin(true);
      this.getUserFavorites(fetchUser.data.id);
    } catch (error) {
      this.setState({ errorMessage: "Invalid e-mail/password" });
    }
  };

  getUserFavorites = async userId => {
    const fetchFavorites = await fetch.retrieveUserFavorites(userId);
    fetchFavorites.forEach(fav => this.props.handleFavoriteToggle(fav.movie_id))
  };

  signupUser = async () => {
    if (!this.validateInputLength("username")) {
      return;
    }
    const { username, email, password } = this.state;
    const fetchSignup = await fetch.fetchSignupUser(username, email, password);

    this.props.saveUserData(username, fetchSignup.id);
    this.props.handleLogin(true);

    if (fetchSignup.error && fetchSignup.error.includes("already exists")) {
      this.setState({ errorMessage: "User account already exists!" });
    }
  };

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

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  userId: state.currentUser.id
});

export const mapDispatchToProps = dispatch => ({
  handleLogin: loggedIn => dispatch(logIn(loggedIn)),
  saveUserData: (username, id) => dispatch(saveUserData(username, id)),
  handleFavoriteToggle: (id) => dispatch(toggleFavorite(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginControls);
