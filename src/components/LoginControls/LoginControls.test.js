import React from "react";
import { shallow } from "enzyme";
import LoginControls from "./index";

describe("Card", () => {
  it("Renders like snapshot", () => {
    const wrapper = shallow(<LoginControls />)
    expect(wrapper).toMatchSnapshot();
  });
});