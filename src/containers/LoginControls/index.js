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

  componentDidMount = () => {
    this.checkAutoLogin();
  };

  checkAutoLogin = async () => {
    const storedLogin = JSON.parse(localStorage.getItem("coenCollection"));
    if (
      storedLogin &&
      storedLogin.loggedIn &&
      this.props.location.pathname === "/login"
    ) {
      await this.setState({
        email: storedLogin.email,
        password: storedLogin.password
      });
      this.loginUser();
    }
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.clearErrorMessage();
    if (this.validateEmail() && this.validateInputLength("password", 6)) {
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

  validateInputLength = (inputType, length) => {
    if (this.state[inputType].length >= length) {
      return true;
    } else {
      this.props.handleErrorMessage(
        `${inputType} must be at least ${length} characters`
      );
    }
  };

  loginUser = async () => {
    try {
      const { email, password } = this.state;
      const fetchUser = await fetch.fetchLoginUser(email, password);
      this.updateUserDataAfterLogin(fetchUser);
    } catch (error) {
      this.props.handleErrorMessage("Invalid e-mail/password");
    }
  };

  updateUserDataAfterLogin = userData => {
    const { email, password } = this.state;
    this.props.saveUserData(userData.data.name, userData.data.id);
    this.props.handleLogin(true);
    this.getUserFavorites(userData.data.id);
    localStorage.setItem(
      "coenCollection",
      JSON.stringify({ loggedIn: true, email, password })
    );
  };

  getUserFavorites = async userId => {
    try {
      const fetchFavorites = await fetch.retrieveUserFavorites(userId);
      fetchFavorites.forEach(fav =>
        this.props.handleFavoriteToggle(fav.movie_id)
      );
    } catch (error) {
      this.props.handleErrorMessage("Favorites error");
    }
  };

  signupUser = async () => {
    if (!this.validateInputLength("username", 2)) {
      return;
    }
    const { username, email, password } = this.state;
    const fetchSignup = await fetch.fetchSignupUser(username, email, password);
    if (fetchSignup.error && fetchSignup.error.includes("already exists")) {
      this.props.handleErrorMessage("User account already exists!");
    } else {
      this.updateUserDataAfterSignup(username, fetchSignup.id);
    }
  };

  updateUserDataAfterSignup = (username, id) => {
    this.props.saveUserData(username, id);
    this.props.handleLogin(true);
  };

  clearErrorMessage = () => {
    this.props.handleErrorMessage("");
  };

  render() {
    const { pathname } = this.state;
    return (
      <div className="LoginControls">
        {!this.props.loggedIn && (
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input
              name="email"
              placeholder="email"
              value={this.state.email}
              className={
                pathname === "/signup" ? "signup email" : "login email"
              }
              onChange={this.handleInputChange}
            />
            {pathname === "/signup" && (
              <input
                name="username"
                placeholder="username"
                className={
                  pathname === "/signup" ? "signup username" : "login username"
                }
                value={this.state.username}
                onChange={this.handleInputChange}
              />
            )}
            <input
              name="password"
              placeholder="password"
              className={
                pathname === "/signup" ? "signup password" : "login password"
              }
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <button
              className={
                "submit-btn" + (pathname === "/signup" ? " signup" : " login")
              }
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
          <p className="login-error-msg">{this.props.errorMessage}</p>
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

LoginControls.propTypes = {
  saveUserData: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleErrorMessage: PropTypes.func.isRequired,
  handleFavoriteToggle: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  userId: PropTypes.number,
  errorMessage: PropTypes.string.isRequired
};
