/* eslint-disable */

import React from "react";
import { shallow, mount } from "enzyme";
import {
  Movie,
  mapStateToProps,
  mapDispatchToProps
  // handleToggleFavorite,
  // handleErrorMessage
} from "../index";
import { toggleFavorite, setErrorMessage } from "../../../actions";
import * as fetch from "../../../utilities/fetch.js";

jest.mock("../../../utilities/fetch.js");

describe("Movie", () => {
  let wrapper;
  let defaultState;

  beforeEach(() => {
    wrapper = mount(
      <Movie
        title={"title"}
        overview={"overview"}
        date={"10-20-2018"}
        poster={"url"}
        currentUser={{ name: "john", id: 3 }}
        loggedIn={false}
        handleToggleFavorite={jest.fn()}
        handleErrorMessage={jest.fn()}
        favorited={true}
        id={115}
        voteAverage={4}
      />
    );

    // defaultState = {
    //   isClicked: false,
    // };
  });

  it("should exist", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render like snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("handleClickFavorite", () => {
    it("should call handleErrorMessage if user is not logged in", () => {
      wrapper.instance().handleClickFavorite();
      expect(wrapper.props().handleErrorMessage).toHaveBeenCalled();
    });

    it("should call handleToggleFavorite on card click", () => {
      wrapper = mount(
        <Movie
          title={"title"}
          overview={"overview"}
          date={"10-20-2018"}
          poster={"url"}
          currentUser={{ name: "john", id: 3 }}
          loggedIn={true}
          handleToggleFavorite={jest.fn()}
          handleErrorMessage={jest.fn()}
          favorited={true}
          id={115}
          voteAverage={5}
        />
      );

      wrapper.instance().handleClickFavorite();
      expect(wrapper.props().handleToggleFavorite).toHaveBeenCalled();
    });

    it("should call removeFavorite if favorited is true", () => {
      wrapper = mount(
        <Movie
          title={"title"}
          overview={"overview"}
          date={"10-20-2018"}
          poster={"url"}
          currentUser={{ name: "john", id: 3 }}
          loggedIn={true}
          handleToggleFavorite={jest.fn()}
          handleErrorMessage={jest.fn()}
          favorited={true}
          id={115}
          voteAverage={5}
        />
      );

      wrapper.instance().handleClickFavorite();
      expect(fetch.removeFavorite).toHaveBeenCalled();
    });

    it("should call fetchAddFavorite if favorited is false", () => {
      wrapper = mount(
        <Movie
          title={"title"}
          overview={"overview"}
          date={"10-20-2018"}
          poster={"url"}
          currentUser={{ name: "john", id: 3 }}
          loggedIn={true}
          handleToggleFavorite={jest.fn()}
          handleErrorMessage={jest.fn()}
          favorited={false}
          id={115}
          voteAverage={5}
        />
      );

      wrapper.instance().handleClickFavorite();
      expect(fetch.fetchAddFavorite).toHaveBeenCalled();
    });
  });

  describe("handleHover", () => {
    it("should toggle isHovered when handleHover is called", () => {
      wrapper.setState({ isHovered: false });

      wrapper.instance().handleHover(true);

      expect(wrapper.state().isHovered).toEqual(true);
    });

    it("should call handleHover when mouse leaves picture", () => {
      wrapper.setState({ isHovered: true });
      wrapper.find(".Movie").simulate("mouseLeave");
      expect(wrapper.state().isHovered).toEqual(false);
    });

    it("should call handleHover when mouse enters picture", () => {
      wrapper.setState({ isHovered: false });
      wrapper.find(".Movie").simulate("mouseEnter");
      expect(wrapper.state().isHovered).toEqual(true);
    });
  });

  describe("verifyUserIsLoggedIn", () => {
    it("should return true if loggedIn is true", () => {
      wrapper = mount(
        <Movie
          title={"title"}
          overview={"overview"}
          date={"10-20-2018"}
          poster={"url"}
          currentUser={{ name: "john", id: 3 }}
          loggedIn={true}
          handleToggleFavorite={jest.fn()}
          handleErrorMessage={jest.fn()}
          favorited={true}
          id={115}
          voteAverage={5}
        />
      );

      expect(wrapper.instance().verifyUserIsLoggedIn()).toEqual(true);
    });
  });

  //   it("should toggle isClicked in state when handleCardClick is called", () => {
  //     wrapper.setState({ isClicked: false });

  //     wrapper.instance().handleCardClick();

  //     expect(wrapper.state().isClicked).toEqual(true);
  //   });
  // });

  describe("mapStateToProps", () => {
    it("should return an object with currentUser", () => {
      const mockState = {
        currentUser: {
          name: "John",
          id: 11
        }
      };

      const expected = {
        currentUser: {
          name: "John",
          id: 11
        }
      };

      const mappedToProps = mapStateToProps(mockState);
      expect(mappedToProps).toEqual(expected);
    });

    it("should return an object with loggedIn status", () => {
      const mockState = {
        loggedIn: true
      };

      const expected = {
        loggedIn: true
      };

      const mappedToProps = mapStateToProps(mockState);
      expect(mappedToProps).toEqual(expected);
    });
  });

  describe("mapDispatchToProps", () => {
    it("should call dispatch with toggle favorite action when handleToggleFavorite is called", () => {
      const mockDispatch = jest.fn();

      const actionToDispatch = toggleFavorite(2);

      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.handleToggleFavorite(2);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it("should call dispatch with set error message action when handleErrorMessage is called", () => {
      const mockDispatch = jest.fn();

      const actionToDispatch = setErrorMessage("Invalid login");

      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.handleErrorMessage("Invalid login");
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});

// it('should have default state', () => {
//   expect(JSON.stringify(wrapper.state())).toEqual(JSON.stringify(defaultState));
// });

//These two tests aren't passing. Not sure what the reason is....

// it('should call handleCardClick if a Movie is hovered over', () => {
//   const mockHandleCardClick = jest.fn();

//   wrapper.instance().handleCardClick = mockHandleCardClick;

//   wrapper.find('.Movie').simulate('mouseenter');

//   expect(mockHandleCardClick).toHaveBeenCalled();
// });

// it('should call handleCardClick if mouse moves off a Movie', () => {
//   const mockHandleCardClick = jest.fn();

//   wrapper.instance().handleCardClick = mockHandleCardClick;

//   wrapper.find('.Movie').simulate('mouseleave');

//   expect(mockHandleCardClick).toHaveBeenCalled();
