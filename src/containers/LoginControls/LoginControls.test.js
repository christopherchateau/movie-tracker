/* eslint-disable */

import React from "react";
import { shallow, mount } from "enzyme";
import { LoginControls, mapStateToProps, mapDispatchToProps } from "./index";
import * as fetch from '../../utilities/fetch.js';
import { logIn, saveUserData } from "../../actions";

describe("LoginControls", () => {
  let wrapper;
  let mockHandleSubmit;

  beforeEach(() => {
    mockHandleSubmit = jest.fn()
    wrapper = shallow(<LoginControls 
      loggedIn={false}
      handleLogin={jest.fn()}
      saveUserData={jest.fn()}
      location={{pathname: ''}} 
      />)

  })

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  })

  it("should render like snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleInputChange', () => {
    it('calls handleInputChange when username is changed', () => {
      wrapper.setState({ pathname: '/signup' });
      const spy = spyOn(wrapper.instance(), 'handleInputChange');
      wrapper.instance().forceUpdate();
      const mockEvent = {target: {value: 'users name'}};

      wrapper.find('.username').simulate('change', mockEvent);

      expect(spy).toHaveBeenCalled();
    });

    it('should update username in state when handleInputChange is called', () => {
      let mockName = 'John';
      let mockEvent = {
        target: { name: 'username', value: mockName }
      };

      wrapper.instance().handleInputChange(mockEvent);

      expect(wrapper.state('username')).toBe(mockName);
    });

    it('calls handleInputChange when password is changed', () => {
      wrapper.setState({ pathname: '/signup' });
      const spy = spyOn(wrapper.instance(), 'handleInputChange');
      wrapper.instance().forceUpdate();
      const mockEvent = {target: {value: 'users password'}};

      wrapper.find('.password').simulate('change', mockEvent);

      expect(spy).toHaveBeenCalled();
    });

    it('should update password in state when handleInputChange is called', () => {
      let mockPassword = 'password';
      let mockEvent = {
        target: { name: 'password', value: mockPassword }
      };

      wrapper.instance().handleInputChange(mockEvent);

      expect(wrapper.state('password')).toBe(mockPassword);
    });

    it('calls handleInputChange when email is changed', () => {
      wrapper.setState({ pathname: '/signup' });
      const spy = spyOn(wrapper.instance(), 'handleInputChange');
      wrapper.instance().forceUpdate();
      const mockEvent = {target: {value: 'users email'}};

      wrapper.find('.email').simulate('change', mockEvent);

      expect(spy).toHaveBeenCalled();
    });

    it('should update email in state when handleInputChange is called', () => {
      let mockEmail = 'john@gmail.com'
      let mockEvent = {
        target: { name: 'email', value: mockEmail }
      };

      wrapper.instance().handleInputChange(mockEvent);

      expect(wrapper.state('email')).toBe(mockEmail);
    });
  })
  
  describe('handleSubmit', () => {
    const mockEvent = { preventDefault: jest.fn() }

    it('should call handleSubmit when button is clicked', () => {
      const spy = spyOn(wrapper.instance(), 'handleSubmit');
      const mockEvent = { preventDefault: jest.fn() }
      wrapper.instance().forceUpdate();

      wrapper.find('form').simulate('submit', mockEvent)

      expect(spy).toHaveBeenCalled()
    })
    it('should clear the errorMessage in state', () => {
      wrapper.setState({ 
          pathname: '/login',
          email: 'bob@gmail.com',
          password: 'password' 
        })

      wrapper.instance().loginUser = jest.fn()
      wrapper.instance().signupUser = jest.fn()

      wrapper.instance().handleSubmit(mockEvent)

      expect(wrapper.state('errorMessage')).toEqual('')
    })
    it('should call loginUser given the right conditions', () => {
      wrapper.setState({ 
          pathname: '/login',
          email: 'bob@gmail.com',
          password: 'password' 
        })

      wrapper.instance().loginUser = jest.fn()
      wrapper.instance().signupUser = jest.fn()
      
      wrapper.instance().handleSubmit(mockEvent)

      expect(wrapper.instance().loginUser).toHaveBeenCalled();
    })
    it('should call signupUser given the right conditions', () => {
      wrapper.setState({ 
          pathname: '/signup',
          email: 'bob@gmail.com',
          password: 'password' 
        })
      
      wrapper.instance().loginUser = jest.fn()
      wrapper.instance().signupUser = jest.fn()
      
      wrapper.instance().handleSubmit(mockEvent)

      expect(wrapper.instance().signupUser).toHaveBeenCalled();
    })
  })

  describe('validateEmail', () => {
    it('should accept valid email', () => {
      wrapper.setState({ email: 'john@gmail.com' })
      expect(wrapper.instance().validateEmail()).toEqual(true)
    })

    it('should update error message in state with invalid email address', () => {
      wrapper.setState({email: 'johngmail.com'})
      const expected = "Please enter a valid e-mail address" 
      wrapper.instance().validateEmail()
      expect(wrapper.state('errorMessage')).toEqual(expected)
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

    })
    it('should call saveUserData with the correct params', () => {

    })
    it('should call handleLogin with the correct params', () => {

    })
    it('should update errorMessage if there is an error', () => {

    })

  })

  describe('signupUser', () => {
    it('should return if the username does not have the required length', async () => {
      wrapper.setState({ username: 'Jo'});

      expect(await wrapper.instance().signupUser()).toEqual(undefined);
    });
    it('should call fetchSignupUser with the correct params', () => {

    })
    it('should call saveUserData with the correct params', () => {

    })
    it('should call handleLogin with the correct param', () => {

    })
    it('should update errorMessage if there is an error', () => {

    })
  })
});

describe('mapStateToProps', () => {
  it('should return an object with a loggedIn status', () => {
    const mockState = { loggedIn: true };
    const expected = { loggedIn: true };

    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(expected);
  })
})
describe('mapDispatchToProps', () => {
  const mockDispatch = jest.fn();

  it('should call dispatch with logIn action when handleLogin is called', () => {
    const actionToDispatch = logIn(true);

    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.handleLogin(true);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  })
  it('should call dispatch with saveUserData action when saveUserData is called', () => {
    const actionToDispatch = saveUserData('username', 3);

    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.saveUserData('username', 3);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  })
})