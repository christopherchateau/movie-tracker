import React from "react";
import { mapStateToProps, mapDispatchToProps, NavBar } from "../index";
import { shallow } from "enzyme";
import { NavLink } from "react-router-dom";
import { logIn, setErrorMessage, resetFavorites, displayFavorites } from "../../../actions";

describe("NavBar", () => {
  let wrapper;
  const mockHandleLogin = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <NavBar
        loggedIn={true}
        currentUser={{ name: "Taylor", id: 2 }}
        handleLogin={mockHandleLogin}
        errorMessage={"Invalid login"}
        showFavorites={false}
        handleLogin={jest.fn()}
        handleErrorMessage={jest.fn()}
        handleResetFavorites={jest.fn()}
        handleDisplayFavorites={jest.fn()}
      />
    );
  });

  it("should exist", () => {
    expect(wrapper).toBeDefined();
  });

  it("render like snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render navlinks if user is not logged in", () => {
    wrapper = shallow(
      <NavBar
        loggedIn={false}
        currentUser={{ name: "Taylor", id: 2 }}
        handleLogin={mockHandleLogin}
        errorMessage={"Invalid login"}
        showFavorites={false}
        handleLogin={jest.fn()}
        handleErrorMessage={jest.fn()}
        handleResetFavorites={jest.fn()}
        handleDisplayFavorites={jest.fn()}
      />
    );
    expect(wrapper.find(NavLink).length).toEqual(2);
  });

  it("should render a signout button if user is logged in", () => {
    expect(wrapper.find(NavLink).length).toEqual(2);
    expect(wrapper.find(".sign-out-button")).toBeDefined();
  });
});

describe("mapStateToProps", () => {
  it("should return an object with a loggedIn status", () => {
    const mockState = {
      loggedIn: true,
    };

    const expected = {
      loggedIn: true,
    };

    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(expected);
  });
  it("should return an object with a currentUser", () => {
    const mockState = {
      currentUser: {name: 'Taylor', id: 5},
    };

    const expected = {
      currentUser: {name: 'Taylor', id: 5},
    };

    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(expected);
  });
  it("should return an object with an errorMessage", () => {
    const mockState = {
      errorMessage: 'Error',
    };

    const expected = {
      errorMessage: 'Error',
    };

    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(expected);
  });
  it("should return an object with showFavorites status", () => {
    const mockState = {
      showFavorites: true
    };

    const expected = {
      showFavorites: true
    };

    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(expected);
  });
});

describe("mapDispatchToProps", () => {
  it("should call dispatch with a logIn action when handleLogin is called", () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = logIn(true);

    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.handleLogin(true);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
    it("should call dispatch with a setErrorMessage action when handleErrorMessage is called", () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = setErrorMessage('error');

    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.handleErrorMessage('error');

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
      it("should call dispatch with a resetFavorites action when handleResetFavorites is called", () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = resetFavorites();

    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.handleResetFavorites();

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
        it("should call dispatch with a displayFavorites action when handleDisplayFavorites is called", () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = displayFavorites(true);

    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.handleDisplayFavorites(true);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
});
