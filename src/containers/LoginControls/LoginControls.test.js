/* eslint-disable */

import React from "react";
import { shallow } from "enzyme";
import {LoginControls, mapStateToProps, mapDispatchToProps} from "./index";

describe("LoginControls", () => {
  let wrapper;
  // let defaultState;

  beforeEach(() => {
    wrapper = shallow(<LoginControls 
      loggedIn={true}
      handleLogin={jest.fn()}
      saveName={jest.fn()}
      location={{pathname: ''}} 
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
  
});