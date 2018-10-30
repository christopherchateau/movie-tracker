/* eslint-disable */

import React from "react";
import { shallow } from "enzyme";
import { mapStateToProps, MovieContainer } from "../index";
import Movie from "../../../containers/Movie";

describe("MovieContainer", () => {
  let wrapper;
  let mockMovies

  beforeEach(() => {
    mockMovies = [
      {
        title: "The Big Lebowski",
        date: "1998-03-06",
        poster:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/aHaVjVoXeNanfwUwQ92SG7tosFM.jpg",
        overview:
          'Jeffrey "The Dude" Lebowski, a Los Angeles slacker who only wants to bowl and drink white Russians, is mistaken for another Jeffrey Lebowski, a wheelchair-bound millionaire, and finds himself dragged into a strange series of events involving nihilists, adult film producers, ferrets, errant toes, and large sums of money.',
        voteAverage: 7.9,
        id: 115,
        favorited: false
      }
    ];

    wrapper = shallow(<MovieContainer 
      movies={mockMovies}
      showFavorites={true}
      userName={'Taylor'} 
    />);
  });

  it("should exist", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render like snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render cards if there are movies in the movies array", () => {

    expect(wrapper.find(Movie)).toBeDefined();
  });

  it("should render the spinner image if there are no movies in the movies array", () => {
    mockMovies = []

    wrapper = shallow(<MovieContainer 
      movies={mockMovies}
      showFavorites={true}
      userName={'Taylor'} 
    />);

    expect(wrapper.find(".spinner")).toBeDefined();
  });
});

describe("mapStateToProps", () => {
  it("should return an object with a movies array", () => {
    
    const mockState = {
      movies: [{ title: "Raising Arizona" }],
      showFavorites: false,
      currentUser: { name: 'Taylor', id: 4} 
    };

    const expected = {
      movies: [{ title: "Raising Arizona" }],
      showFavorites: false,
      userName: 'Taylor'

    };

    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps).toEqual(expected);
  });
  // it("should return an object with showFavorites", () => {
  //   const mockState = {
  //   };

  //   const expected = {
  //   };

  //   const mappedProps = mapStateToProps(mockState);
  //   expect(mappedProps).toEqual(expected);
  // });
  // it("should return an object with a userName", () => {
  //   const mockState = {
  //   };

  //   const expected = {
  //   };

  //   const mappedProps = mapStateToProps(mockState);
  //   expect(mappedProps).toEqual(expected);
  // });
});
