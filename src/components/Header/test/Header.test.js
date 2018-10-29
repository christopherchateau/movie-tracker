/* eslint-disable */

import React from "react";
import { shallow } from "enzyme";
import Header from "../index";

describe("Header", () => {
  it('should exist', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toBeDefined();    
  });

  it("should render like snapshot", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});