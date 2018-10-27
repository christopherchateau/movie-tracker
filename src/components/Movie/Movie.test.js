/* eslint-disable */

import React from "react";
import { shallow } from "enzyme";
import Movie from "./index";

describe("Card", () => {
  it("Renders like snapshot", () => {
    const wrapper = shallow(<Movie />);
    expect(wrapper).toMatchSnapshot();
  });
});
