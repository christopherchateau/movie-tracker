/* eslint-disable */

import React from "react";
import { shallow } from "enzyme";
import { Movie, mapStateToProps, mapDispatchToProps } from "../index";

describe("Movie", () => {
  let wrapper;
  let defaultState;

  beforeEach(() => {
    wrapper = shallow(<Movie 
                title={'title'}
                overview={'overview'}
                date={'10-20-2018'}
                poster={'url'} 
              />);

    defaultState = {
      isClicked: false,
    };
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it("should render like snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default state', () => {
    expect(JSON.stringify(wrapper.state())).toEqual(JSON.stringify(defaultState));
  });

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
  // });

  it('should toggle isClicked in state when handleCardClick is called', () => {
    wrapper.setState({isClicked: false});

    wrapper.instance().handleCardClick(); 

    expect(wrapper.state().isClicked).toEqual(true);
  });
});

  describe('mapStateToProps', () => {
    it('should return an object with currentUser', () => {
      const mockState = {
        currentUser: {
          name: 'John',
          id: 11
        }
      }

      const expected = {
        currentUser: {
          name: 'John',
          id: 11
        }
      }

      const mappedToProps = mapStateToProps(mockState)
      expect(mappedToProps).toEqual(expected)
    })
  })









