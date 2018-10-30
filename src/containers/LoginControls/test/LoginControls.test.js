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
    it('should accept valid email', () => {
      wrapper.setState({ email: 'john@gmail.com' })

      expect(wrapper.instance().validateEmail()).toEqual(true)
    })

    it('should call handleErrorMessage with invalid email address', () => {
      wrapper.setState({email: 'johngmail'})

      // wrapper.instance().validateEmail()

      // expect(wrapper.props().handleErrorMessage).toHaveBeenCalled()
      expect(wrapper.instance().validateEmail()).toEqual(false)

    })
  })

  describe('validateInputLength', () => {
    it('should accept a username of at least 3 letters', () => {
      wrapper.setState({username: 'john'})
      expect(wrapper.instance().validateInputLength('username')).toEqual(true)
    })

    it('should update error message in state with too few letters', () => {
      wrapper.setState({username: 'jo'})
      const expected = 'username must be at least 3 characters' 
      wrapper.instance().validateInputLength('username')
      expect(wrapper.state('errorMessage')).toEqual(expected)
    })
  })
  
  describe('loginUser', () => {

    it('should call fetchSignupUser with the correct params', async () => { 
      let mockEmail = 'bigLo@gmail.com'
      let mockPassword = 'password'
      let mockUsername = 'Taylor'

      wrapper.setState({
        email: mockEmail,
        password: mockPassword,
        username: mockUsername
      })

      wrapper.instance().loginUser();
      expect(fetch.fetchLoginUser).toHaveBeenCalledWith( mockEmail, mockPassword)
    })

    it('should call saveUserData with the correct params', () => {
      let mockFetchUserReturn = {
        data: {
          name: 'Taylor',
          id: 7
        }
      }
      wrapper.instance().loginUser();
      expect(wrapper.props().saveUserData).toHaveBeenCalledWith(mockFetchUserReturn.data.name, mockFetchUserReturn.data.id);
    })


    it('should call handleLogin with the correct params', () => {
      wrapper.instance().loginUser();

      expect(wrapper.props().saveUserData).toHaveBeenCalledWith(true);
    })

    it('should call getUserFavorites witht he correct params', () => {})

    it('should update errorMessage if there is an error', () => {})


    it('should call handleErrorMessage if there is an error', () => {})

  })

  describe('getUserFavorites', () => {
    it('should call retrieveUserFavorites with the correct params', () => {})

    it('should call handleFavoriteToggle with the correct params for each favorite', () => {})


    
 
  });

  // describe("signupUser", () => {
  //   it("should return if the username does not have the required length", async () => {
  //     wrapper.setState({ username: "Jo" });

  //     expect(await wrapper.instance().signupUser()).toEqual(undefined);
  //   })

  //   it('should call fetchSignupUser with the correct params', () => {
  //     let mockEmail = 'bigLo@gmail.com'
  //     let mockPassword = 'password'
  //     let mockUsername = 'Taylor'

  //     wrapper.setState({
  //       email: mockEmail,
  //       password: mockPassword,
  //       username: mockUsername
  //     })

  //     wrapper.instance().signupUser()

  //     expect(fetch.fetchSignupUser).toHaveBeenCalledWith(mockUsername, mockEmail, mockPassword)
  //   })

  //   it('should call saveUserData with the correct params', () => {
  //   });
    
  //   it('should call handleLogin with the correct param', () => {

  //   })
  //   it('should update errorMessage if there is an error', () => {

  //   })
  // })

  describe('clearErrorMessage', () => {
    it('should call handleErrorMessage witht he correct params', () => {})
  });
});

describe("mapStateToProps", () => {
  it("should return an object with a loggedIn status", () => {
    const mockState = { loggedIn: true };
    const expected = { loggedIn: true };

    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(expected);
  });

  it("should return an object with current user id", () => {});

  it("should return an object with an error message", () => {});
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
