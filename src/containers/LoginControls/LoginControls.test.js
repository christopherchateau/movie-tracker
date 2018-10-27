/* eslint-disable */

import React from "react";
import { shallow, mount } from "enzyme";
import { LoginControls, mapStateToProps, mapDispatchToProps } from "./index";

describe("LoginControls", () => {
  let wrapper;
  let mockHandleSubmit;
  // let defaultState;

  beforeEach(() => {
    mockHandleSubmit = jest.fn()
    wrapper = shallow(<LoginControls 
      loggedIn={false}
      handleLogin={jest.fn()}
      saveName={jest.fn()}
      location={{pathname: ''}} 
      handleSubmit={mockHandleSubmit}
      />)

    // defaultState = {
    //   email: "",
    //   password: "",
    //   username: "",
    //   pathname: this.props.location.pathname,
    //   error: false,
    //   errorMessage: ""
    // };
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  })

  it("should render like snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  // it('should have default state', () => {
  //   expect(JSON.stringify(wrapper.state())).toEqual(JSON.stringify(defaultState));
  // });
  it('should update name in state when handleInputChange is called', () => {
    let mockName = 'John'
    let mockEvent = {
      target: { name: 'username', value: mockName }
    }

    wrapper.instance().handleInputChange(mockEvent);

    expect(wrapper.state('username')).toBe(mockName)
  })

  it('should update password in state when handleInputChange is called', () => {
    let mockPassword = 'password'
    let mockEvent = {
      target: { name: 'password', value: mockPassword }
    }

    wrapper.instance().handleInputChange(mockEvent);

    expect(wrapper.state('password')).toBe(mockPassword)
  })

  it('should update email in state when handleInputChange is called', () => {
    let mockEmail = 'john@gmail.com'
    let mockEvent = {
      target: { name: 'email', value: mockEmail }
    }

    wrapper.instance().handleInputChange(mockEvent);

    expect(wrapper.state('email')).toBe(mockEmail)
  })
  
  // it('should call handleSubmit when button is clicked', () => {
  //   wrapper = mount(<LoginControls 
  //     loggedIn={false}
  //     handleLogin={jest.fn()}
  //     saveName={jest.fn()}
  //     location={{pathname: ''}} 
  //     handleSubmit={mockHandleSubmit}
  //     />)
  //   const mockEvent = {
  //     preventDefault: jest.fn()
  //   }
  //   const spy = spyOn(wrapper.instance(), 'handleSubmit')
  //   wrapper.find('form').simulate('submit', mockEvent)
  //   expect(spy).toHaveBeenCalled()
    // wrapper.instance().handleSubmit = jest.fn()
    // mockHandleSubmit = wrapper.instance().handleSubmit
    // wrapper.find('.login-form').simulate('submit', mockEvent)
    // expect(mockHandleSubmit).toHaveBeenCalled()
  // })

  it('should accept valid email', () => {
    wrapper.setState({email: 'john@gmail.com'})
    expect(wrapper.instance().validateEmail()).toEqual(true)
  })

  it('should update error message in state with invalid email address', () => {
    wrapper.setState({email: 'johngmail.com'})
    const expected = "Please enter a valid e-mail address" 
    wrapper.instance().validateEmail()
    expect(wrapper.state('errorMessage')).toEqual(expected)
  })

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
});