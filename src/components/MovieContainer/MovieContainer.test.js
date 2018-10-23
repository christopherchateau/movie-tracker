/* eslint-disable */

import React from "react";
import { shallow } from "enzyme";
import MovieContainer from "./index";

describe("Card", () => {
  it("Renders like snapshot", () => {
    const wrapper = shallow(<MovieContainer />)
    expect(wrapper).toMatchSnapshot();
  });
});