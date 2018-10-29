import React from 'react';
import { mapStateToProps, mapDispatchToProps, NavBar } from './index';
import { shallow } from 'enzyme';
import { NavLink } from "react-router-dom";
import { logIn } from "../../actions";

describe('NavBar', () => {
  let wrapper;
  const mockHandleLogin = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<NavBar 
        loggedIn={true}
        currentUser={'Taylor'}
        handleLogin={mockHandleLogin} />);
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

	it("render like snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render navlinks if user is not logged in', () => {
    wrapper = shallow(<NavBar 
        loggedIn={false}
        currentUser={''}
        handleLogin={mockHandleLogin} />);
    expect(wrapper.find(NavLink).length).toEqual(2);
  });

  it('should render a signout button if user is logged in', () => {
    expect(wrapper.find(NavLink).length).toEqual(0);
    expect(wrapper.find('.sign-out-button')).toBeDefined();
  });

  it('should call handleLogin on click', () => {
    wrapper.find('.sign-out-button').simulate('click');
    expect(mockHandleLogin).toHaveBeenCalled();
  });
});

describe('mapStateToProps', () => {
	it('should return an object with a loggedIn status', () => {
		const mockState = {
			loggedIn: true
		};

		const expected = {
			loggedIn: true
		};

		const mappedProps = mapStateToProps(mockState);
		expect(mappedProps).toEqual(expected);
	});
});

describe('mapDispatchToProps', () => {
  it('should call dispatch with a logIn action when handleLogin is called', () => {
    const mockDispatch = jest.fn();
    const actionToDispatch = logIn(true);

    const mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.handleLogin(true);

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  });
})
