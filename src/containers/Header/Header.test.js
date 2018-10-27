/* eslint-disable */

import React from "react";
import { shallow } from "enzyme";
import Header from "./index";

describe("Card", () => {
  it("Renders like snapshot", () => {
    const wrapper = shallow(<Header />)
    expect(wrapper).toMatchSnapshot();
  });
});