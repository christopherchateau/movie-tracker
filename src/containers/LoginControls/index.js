import React, { Component } from "react";
import PropTypes from "prop-types";
import "./LoginControls.css";
import {
  logIn,
  saveUserData,
  toggleFavorite,
  setErrorMessage
} from "../../actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as fetch from "../../utilities/fetch.js";

export class LoginControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      pathname: this.props.location.pathname,
      error: false
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.clearErrorMessage();
    if (this.validateEmail() && this.validateInputLength("password")) {
      this.state.pathname === "/login" ? this.loginUser() : this.signupUser();
    }
  };

  validateEmail = () => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(this.state.email)) {
      return true;
    }
    this.props.handleErrorMessage("Please enter a valid e-mail address");
    return false;
  };

  validateInputLength = inputType => {
    if (this.state[inputType].length > 2) {
      return true;
    } else {
      this.props.handleErrorMessage(
        `${inputType} must be at least 3 characters`
      );
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
      this.props.handleErrorMessage("Invalid e-mail/password");
    }
  };

  getUserFavorites = async userId => {
    const fetchFavorites = await fetch.retrieveUserFavorites(userId);
    fetchFavorites.forEach(fav =>
      this.props.handleFavoriteToggle(fav.movie_id)
    );
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
      this.props.handleErrorMessage("User account already exists!");
    }
  };

  clearErrorMessage = () => {
    this.props.handleErrorMessage("");
  };

  render() {
    return (
      <div className="LoginControls">
        {!this.props.loggedIn && (
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            {this.state.pathname === "/signup" && (
              <input
                name="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
            )}
            <input
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <button className="submit-btn">submit</button>
          </form>
        )}
        {this.props.loggedIn && (
          <div className="loggedIn">
            <Redirect to="/" />
          </div>
        )}
        <section>
          <p className="error-msg">{this.props.errorMessage}</p>
        </section>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  userId: state.currentUser.id,
  errorMessage: state.errorMessage
});

export const mapDispatchToProps = dispatch => ({
  saveUserData: (username, id) => dispatch(saveUserData(username, id)),
  handleLogin: loggedIn => dispatch(logIn(loggedIn)),
  handleErrorMessage: message => dispatch(setErrorMessage(message)),
  handleFavoriteToggle: id => dispatch(toggleFavorite(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginControls);
