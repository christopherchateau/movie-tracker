import React from 'react';
import * as Fetch from '../fetch';
import { movieCleaner } from '../helper';

describe('movieCleaner', async () => {
	let mockMovies;
	let mockResults;

	beforeEach(() => {

		mockMovies = {
			movie: {
				title: 'Raising Arizona',
				date: '02/03/1996',
				poster: 'img',
				overview: 'A couple raising a child'
			}
		}

		mockResults = {
			movie: {
				title: 'Raising Arizona',
				date: '02/03/1996',
				poster: 'img',
				overview: 'A couple raising a child'
			}
		}

		window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
			status: 200,
			json: () => Promise.resolve({
				results: mockResults
			})
		}))
	})

	it('should call fetchData with the correct params', async () => {
  		const expected = "https://api.themoviedb.org/3/person/1223/movie_credits?api_key=9954e71d12ad27a2cefac26f2e808e76";
		await Fetch.fetchData(mockMovies)
		expect(window.fetch).toHaveBeenCalledWith(expected)
	})

  	it('should remove unwanted movie data', () => {
  		
  	})
	})
