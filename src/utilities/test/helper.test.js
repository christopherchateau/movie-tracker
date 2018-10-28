import React from 'react';
import * as Fetch from '../fetch';
import { movieCleaner } from '../helper';
import * as Mocks from './mocks'


describe('movieCleaner', async () => {

	beforeEach(() => {
		window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
			status: 200,
			json: () => Promise.resolve({
				results: Mocks.mockResults
			})
		}))
	})

	it('should call fetchData with the correct params', async () => {
  		const expected = "https://api.themoviedb.org/3/person/1223/movie_credits?api_key=9954e71d12ad27a2cefac26f2e808e76";
		await Fetch.fetchData(Mocks.mockMovies)
		expect(window.fetch).toHaveBeenCalledWith(expected)
	})

  	it('should remove unwanted movie data', () => {
  		
  	})
	})
