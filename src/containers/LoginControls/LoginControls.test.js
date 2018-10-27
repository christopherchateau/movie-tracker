/* eslint-disable */

import React from "react";
import { shallow } from "enzyme";
import LoginControls from "./index";

describe("Card", () => {
  it('should exist', () => {
    const wrapper = shallow(<LoginControls />)
    expect(wrapper).toBeDefined();
  })

  it("should render like snapshot", () => {
    const wrapper = shallow(<LoginControls />)
    expect(wrapper).toMatchSnapshot();
  });
});