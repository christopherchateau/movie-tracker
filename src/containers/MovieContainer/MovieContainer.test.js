/* eslint-disable */

import React from "react";
import { shallow } from "enzyme";
import { mapStateToProps, MovieContainer } from "./index";

describe("Card", () => {
  it("Renders like snapshot", () => {
    const wrapper = shallow(<MovieContainer movies={[]}/>);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('mapStateToProps', () => {
	it('should return an object with a movies array', () => {
		const mockState = {
			movies: [{title: 'Raising Arizona'}]
		}

		const expected = {
			movies: [{title: 'Raising Arizona'}]
		}

		const mappedProps = mapStateToProps(mockState)
		expect(mappedProps).toEqual(expected)
	})
})
