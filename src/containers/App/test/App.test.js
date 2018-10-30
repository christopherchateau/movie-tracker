/* eslint-disable */

import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { loadMovies } from "../../../actions";
import { App, mapDispatchToProps } from "../index";

describe("App", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App handleFetch={jest.fn()} />);
  });

  it("should exist", () => {
    expect(wrapper).toBeDefined();
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("mapDispatchToProps", () => {
  it("should call dispatch with load movies action when handleFetch is called", () => {
    const wrapper = shallow(<App handleFetch={jest.fn()} />);

    const mockDispatch = jest.fn();
    const actionToDispatch = loadMovies([{ title: "Raising Arizona" }]);

    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.handleFetch([{ title: "Raising Arizona" }]);
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
});
