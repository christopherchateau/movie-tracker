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

  
});