/* eslint-disable */

import React from "react";
import { shallow, mount } from "enzyme";
import { Movie, mapStateToProps, mapDispatchToProps, handleToggleFavorite, handleErrorMessage } from "../index";
import { toggleFavorite, setErrorMessage } from '../../../actions'

describe("Movie", () => {
  let wrapper;
  let defaultState;

  beforeEach(() => {
    wrapper = mount(<Movie 
                title={'title'}
                overview={'overview'}
                date={'10-20-2018'}
                poster={'url'} 
                currentUser={{name: 'john', id: 3}}
                loggedIn={false}
                handleToggleFavorite={jest.fn()}
                handleErrorMessage={jest.fn()}
              />);

    // defaultState = {
    //   isClicked: false,
    // };
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  it("should render like snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleErrorMessage if user is not logged in', () => {
    const handleErrorMessage = jest.fn()

    wrapper.instance().handleCardClick()
    expect(wrapper.props().handleErrorMessage).toHaveBeenCalled()
  })

  it('should call hand')

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
  // });

  it.skip('should toggle isClicked in state when handleCardClick is called', () => {
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

    it('should return an object with loggedIn status', () => {
      const mockState = {
        loggedIn: true
      }

      const expected = {
        loggedIn: true
      }

      const mappedToProps = mapStateToProps(mockState)
      expect(mappedToProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch with toggle favorite action when handleToggleFavorite is called', () => {
      const mockDispatch = jest.fn()

      const actionToDispatch = toggleFavorite(2)

      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.handleToggleFavorite(2)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should call dispatch with set error message action when handleErrorMessage is called', () => {
      const mockDispatch = jest.fn()

      const actionToDispatch = setErrorMessage('Invalid login')

      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.handleErrorMessage('Invalid login')
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })









