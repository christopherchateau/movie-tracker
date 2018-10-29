/* eslint-disable */

import React from "react";
import { shallow } from "enzyme";
import { mapStateToProps, MovieContainer } from "../index";
import Movie from '../../../components/Movie'

describe("MovieContainer", () => {
  let wrapper;

  beforeEach(() => {
    const mockMovies = [{title: 'Raising Arizona'}]
    wrapper = shallow(<MovieContainer movies={mockMovies} />);
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  })

  it("should render like snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render cards if there are movies in the movies array', () => {
    expect(wrapper.find(Movie).length).toEqual(1);
  });

  it('should render the spinner image if there are no movies in the movies array', () => {
    wrapper = shallow(<MovieContainer movies={[]} />);
    expect(wrapper.find('.spinner')).toBeDefined();
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
