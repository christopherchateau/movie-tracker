/* eslint-disable */

import React from "react";
import { shallow, mount } from "enzyme";
import { LoginControls, mapStateToProps, mapDispatchToProps } from "../index";
import * as fetch from "../../../utilities/fetch.js";
import {
  logIn,
  saveUserData,
  setErrorMessage,
  toggleFavorite
} from "../../../actions";
import * as Mocks from './mocks'

jest.mock('../../../utilities/fetch.js')

describe("LoginControls", () => {
  let wrapper;
  let mockHandleSubmit;

  beforeEach(() => {
    mockHandleSubmit = jest.fn();
    wrapper = shallow(
      <LoginControls
        loggedIn={false}
        userId={7}
        errorMessage={'error'}
        handleLogin={jest.fn()}
        saveUserData={jest.fn()}
        location={{ pathname: "" }}
        handleErrorMessage={jest.fn()}
        handleFavoriteToggle={jest.fn()}
      />
    );
  });

  it("should exist", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render like snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("handleInputChange", () => {
    it("calls handleInputChange when username is changed", () => {
      wrapper.setState({ pathname: "/signup" });
      const spy = spyOn(wrapper.instance(), "handleInputChange");
      wrapper.instance().forceUpdate();
      const mockEvent = { target: { value: "users name" } };

      wrapper.find('.username').simulate("change", mockEvent);

      expect(spy).toHaveBeenCalled();
    });

    it("should update username in state when handleInputChange is called", () => {
      let mockName = "John";
      let mockEvent = {
        target: { name: "username", value: mockName }
      };
      wrapper.setState({pathname: "/signup"})

      wrapper.instance().handleInputChange(mockEvent);

      expect(wrapper.state("username")).toBe(mockName);
    });

    it("calls handleInputChange when password is changed", () => {
      wrapper.setState({ pathname: "/signup" });
      const spy = spyOn(wrapper.instance(), "handleInputChange");
      wrapper.instance().forceUpdate();
      const mockEvent = { target: { value: "users password" } };

      wrapper.find(".password").simulate("change", mockEvent);

      expect(spy).toHaveBeenCalled();
    });

    it("should update password in state when handleInputChange is called", () => {
      let mockPassword = "password";
      let mockEvent = {
        target: { name: "password", value: mockPassword }
      };

      wrapper.instance().handleInputChange(mockEvent);

      expect(wrapper.state("password")).toBe(mockPassword);
    });

    it("calls handleInputChange when email is changed", () => {
      wrapper.setState({ pathname: "/signup" });
      const spy = spyOn(wrapper.instance(), "handleInputChange");
      wrapper.instance().forceUpdate();
      const mockEvent = { target: { value: "users email" } };

      wrapper.find(".email").simulate("change", mockEvent);

      expect(spy).toHaveBeenCalled();
    });

    it("should update email in state when handleInputChange is called", () => {
      let mockEmail = "john@gmail.com";
      let mockEvent = {
        target: { name: "email", value: mockEmail }
      };

      wrapper.instance().handleInputChange(mockEvent);

      expect(wrapper.state("email")).toBe(mockEmail);
    });
  });


  describe("handleSubmit", () => {
    const mockEvent = { preventDefault: jest.fn() };

    it("should call handleSubmit when button is clicked", () => {
      const spy = spyOn(wrapper.instance(), "handleSubmit");
      const mockEvent = { preventDefault: jest.fn() };
      wrapper.instance().forceUpdate();

      wrapper.find("form").simulate("submit", mockEvent);

      expect(spy).toHaveBeenCalled();
    });

    it("should call clearErrorMessage", () => {
      wrapper.instance().clearErrorMessage = jest.fn()

      wrapper.instance().handleSubmit(mockEvent);

      expect(wrapper.instance().clearErrorMessage).toHaveBeenCalled();
    });

    it("should call loginUser given the right conditions", () => {
      wrapper.setState({
        pathname: "/login",
        email: "bob@gmail.com",
        password: "password"
      });

      wrapper.instance().loginUser = jest.fn();
      wrapper.instance().signupUser = jest.fn();

      wrapper.instance().handleSubmit(mockEvent);

      expect(wrapper.instance().loginUser).toHaveBeenCalled();
    });

    it("should call signupUser given the right conditions", () => {
      wrapper.setState({
        pathname: "/signup",
        email: "bob@gmail.com",
        password: "password"
      });

      wrapper.instance().loginUser = jest.fn();
      wrapper.instance().signupUser = jest.fn();

      wrapper.instance().handleSubmit(mockEvent);

      expect(wrapper.instance().signupUser).toHaveBeenCalled();
    })
  })

  describe('validateEmail', () => {
    it('should accept valid email and return true', () => {
      wrapper.setState({ email: 'john@gmail.com' })

      expect(wrapper.instance().validateEmail()).toEqual(true)
    })

    // it('should call handleErrorMessage with invalid email address', () => {
    //   wrapper.setState({email: 'johngmail'})

    //   wrapper.instance().validateEmail()

    //   expect(wrapper.props().handleErrorMessage).toHaveBeenCalledWith("Please enter a valid e-mail address")
    // })

    it('should return false with invalid email', () => {
      wrapper.setState({email: 'johngmail'})

      expect(wrapper.instance().validateEmail()).toEqual(false)
    })
  })

  describe('validateInputLength', () => {
    let wrapper = mount(
      <LoginControls
        loggedIn={false}
        userId={7}
        errorMessage={'error'}
        handleLogin={jest.fn()}
        saveUserData={jest.fn()}
        location={{ pathname: "" }}
        handleErrorMessage={jest.fn()}
        handleFavoriteToggle={jest.fn()}
      />
    );

    it('should accept a password of at least 6 letters', () => {
      wrapper.setState({password: 'password'})

      let result = wrapper.instance().validateInputLength('password', 6)

      expect(result).toEqual(true)
    })

    it('should call handleErrorMessage with too few letters in password', () => {
      wrapper.setState({password: 'go'})

      const expected = 'password must be at least 6 characters' 

      wrapper.instance().validateInputLength('password', 6)

      expect(wrapper.props().handleErrorMessage).toHaveBeenCalledWith(expected);
    })
  })
  
  describe('loginUser', () => {
    let wrapper = mount(
      <LoginControls
        loggedIn={false}
        userId={7}
        errorMessage={'error'}
        handleLogin={jest.fn()}
        saveUserData={jest.fn()}
        location={{ pathname: "" }}
        handleErrorMessage={jest.fn()}
        handleFavoriteToggle={jest.fn()}
      />
    );

    it('should call fetchLoginUser with the correct params', async () => { 
      let mockEmail = 'bigLo@gmail.com'
      let mockPassword = 'password'

      wrapper.setState({
        email: mockEmail,
        password: mockPassword,
      })

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve(Mocks.mockUserLoginResponse))

      wrapper.instance().loginUser();
      expect(fetch.fetchLoginUser).toHaveBeenCalledWith( mockEmail, mockPassword)
    })

    it('should call updateUserDataAfterLogin', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve(Mocks.mockUserLoginResponse))

      wrapper.instance().updateUserDataAfterLogin = jest.fn()

      await wrapper.instance().loginUser();
      expect(wrapper.instance().updateUserDataAfterLogin).toHaveBeenCalled();
    })

    it('should call handleErrorMessage if there is an error', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject({error: 'error'}))

      await wrapper.instance().loginUser();
      expect(wrapper.props().handleErrorMessage).toHaveBeenCalledWith("Invalid e-mail/password");

    })
  })

  describe('updateUserDataAfterLogin', () => {
    let wrapper = mount(
      <LoginControls
        loggedIn={false}
        userId={7}
        errorMessage={'error'}
        handleLogin={jest.fn()}
        saveUserData={jest.fn()}
        location={{ pathname: "" }}
        handleErrorMessage={jest.fn()}
        handleFavoriteToggle={jest.fn()}
      />
    );

    it('should call saveUserData with the correct params', async () => {
      wrapper.instance().updateUserDataAfterLogin(Mocks.mockUserData);
     
      expect(wrapper.props().saveUserData).toHaveBeenCalledWith(Mocks.mockUserData.data.name, Mocks.mockUserData.data.id)
    })


    it('should call handleLogin with the correct params', () => {
      wrapper.instance().updateUserDataAfterLogin(Mocks.mockUserData);

      expect(wrapper.props().handleLogin).toHaveBeenCalledWith(true);
    })

    it('should call getUserFavorites with the correct params', () => {
      wrapper.instance().getUserFavorites = jest.fn()

      wrapper.instance().updateUserDataAfterLogin(Mocks.mockUserData);
     
      expect(wrapper.instance().getUserFavorites).toHaveBeenCalledWith(Mocks.mockUserData.data.id)
    })
  })
  
  describe('getUserFavorites', () => {
    const mockUserId = 3
    let wrapper = mount(
      <LoginControls
        loggedIn={false}
        userId={7}
        errorMessage={'error'}
        handleLogin={jest.fn()}
        saveUserData={jest.fn()}
        location={{ pathname: "" }}
        handleErrorMessage={jest.fn()}
        handleFavoriteToggle={jest.fn()}
      />
    );

    it('should call retrieveUserFavorites with the correct params', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true
      }))

      wrapper.instance().getUserFavorites(mockUserId);

      expect(fetch.retrieveUserFavorites).toHaveBeenCalledWith(mockUserId)
    })

    it('should call handleErrorMessage with the correct params', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject({error: 'error'}))

      await wrapper.instance().getUserFavorites(mockUserId);
      expect(wrapper.props().handleErrorMessage).toHaveBeenCalledWith("Favorites error");
    })
  });

  describe('signupUser', () => {

    let wrapper = mount(<LoginControls
      loggedIn={false}
      userId={7}
      errorMessage={'error'}
      handleLogin={jest.fn()}
      saveUserData={jest.fn()}
      location={{ pathname: "" }}
      handleErrorMessage={jest.fn()}
      handleFavoriteToggle={jest.fn()}
    />
  );

    it('should return if a username is 2 or less letters in length', () => {
      wrapper.setState({userName: 'Jo'})
      fetch.fetchSignupUser = jest.fn()

      wrapper.instance().signupUser();

      expect(fetch.fetchSignupUser).not.toHaveBeenCalled()
    })

    it('should call fetchSignupUser with the correct params', async () => { 
      let mockEmail = 'bigLo@gmail.com'
      let mockPassword = 'password'
      let mockUsername = 'Taylor'

      wrapper.setState({
        email: mockEmail,
        password: mockPassword,
        username: mockUsername
      })

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve(Mocks.mockUserSignUpResponse))

      wrapper.instance().signupUser();

      expect(fetch.fetchSignupUser).toHaveBeenCalledWith(mockUsername, mockEmail, mockPassword)
    })
  })

  describe('updateUserDataAfterSignup', () => {
    let wrapper = mount(
      <LoginControls
        loggedIn={false}
        userId={7}
        errorMessage={'error'}
        handleLogin={jest.fn()}
        saveUserData={jest.fn()}
        location={{ pathname: "" }}
        handleErrorMessage={jest.fn()}
        handleFavoriteToggle={jest.fn()}
      />
    );
    let mockUsername='Taylor'
    let mockId = 4

    it('should call saveUserData with the correct params', async () => {

      wrapper.instance().updateUserDataAfterSignup(mockUsername, mockId);
     
      expect(wrapper.props().saveUserData).toHaveBeenCalledWith(mockUsername, mockId)
    })


    it('should call handleLogin with the correct params', () => {
      wrapper.instance().updateUserDataAfterSignup(mockUsername, mockId);

      expect(wrapper.props().handleLogin).toHaveBeenCalledWith(true);
    })
  })

  describe('clearErrorMessage', () => {
    let wrapper = mount(
      <LoginControls
        loggedIn={false}
        userId={7}
        errorMessage={'error'}
        handleLogin={jest.fn()}
        saveUserData={jest.fn()}
        location={{ pathname: "" }}
        handleErrorMessage={jest.fn()}
        handleFavoriteToggle={jest.fn()}
      />
    );

    it('should call handleErrorMessage with the correct params', () => {

    wrapper.instance().clearErrorMessage();
    expect(wrapper.props().handleErrorMessage).toHaveBeenCalled();

    })
  });
});

describe("mapStateToProps", () => {
  it("should return a props object", () => {
    const mockState = { 
      loggedIn: true,
      currentUser: {name: 'Taylor', id: 3},
      errorMessage:''
    };

    const expected = { 
      loggedIn: true,
      userId: 3,
      errorMessage:''
    };

    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(expected);
  });
});

describe("mapDispatchToProps", () => {
  const mockDispatch = jest.fn();
  const mappedProps = mapDispatchToProps(mockDispatch);

  it("should call dispatch with logIn action when handleLogin is called", () => {
    const actionToDispatch = logIn(true);

    mappedProps.handleLogin(true);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
  it("should call dispatch with saveUserData action when saveUserData is called", () => {
    const actionToDispatch = saveUserData("username", 3);

    mappedProps.saveUserData("username", 3);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it("should call dispatch with setErrorMessage action when handleErrorMessage is called", () => {
    const actionToDispatch = setErrorMessage("");

    mappedProps.handleErrorMessage("");

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });

  it("should call dispatch with toggleFavorite action when handleFavoriteToggle is called", () => {
    const actionToDispatch = toggleFavorite(3);

    mappedProps.handleFavoriteToggle(3);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
});