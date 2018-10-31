/* eslint-disable */

import React from "react";
import { shallow } from "enzyme";
import { mapStateToProps, MovieContainer } from "../index";
import Movie from "../../../containers/Movie";
import * as Mocks from "./mocks";

describe("MovieContainer", () => {
  let wrapper;
  let mockMovies;

  beforeEach(() => {
    wrapper = shallow(
      <MovieContainer
        movies={Mocks.mockMovies}
        showFavorites={true}
        userName={"Taylor"}
      />
    );
  });

  it("should exist", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render like snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render image if nothing in favorites", () => {
    expect(wrapper.find(".walter")).toBeDefined();
  });

  it("should render cards if there are movies in the movies array", () => {
    wrapper = shallow(
      <MovieContainer
        movies={Mocks.mockMovies}
        showFavorites={false}
        userName={"Taylor"}
      />
    );
    expect(wrapper.find(Movie).length).toEqual(2);
  });

  it("should render the spinner image if there are no movies in the movies array", () => {
    mockMovies = [];

    wrapper = shallow(
      <MovieContainer
        movies={mockMovies}
        showFavorites={true}
        userName={"Taylor"}
      />
    );

    expect(wrapper.find(".spinner")).toBeDefined();
  });
});

describe("mapStateToProps", () => {
  it("should return an object with a movies array", () => {
    const mockState = {
      movies: [{ title: "Raising Arizona" }],
      showFavorites: false,
      currentUser: { name: "Taylor", id: 4 }
    };

    const expected = {
      movies: [{ title: "Raising Arizona" }],
      showFavorites: false,
      userName: "Taylor"
    };

    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(expected);
  });
});
