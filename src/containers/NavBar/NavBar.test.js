import React from 'react';
import { mapStateToProps, NavBar } from './index';
import { shallow } from 'enzyme'

describe('NavBar', () => {
  it('should exist', () => {
    const wrapper = shallow(<NavBar loggedIn={true}/>);
    expect(wrapper).toBeDefined();
  });
  
	it("Renders like snapshot", () => {
    const wrapper = shallow(<NavBar loggedIn={true}/>);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('mapStateToProps', () => {
	it('should return an object with a loggedIn status', () => {
		const mockState = {
			loggedIn: true
		}

		const expected = {
			loggedIn: true
		}

		const mappedProps = mapStateToProps(mockState)
		expect(mappedProps).toEqual(expected)
	})
})
