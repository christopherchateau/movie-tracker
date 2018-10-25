/* eslint-disable */

import React from 'react';
import { fetchData } from '../fetch';

describe('fetchData', () => {
  it('should call fetchData with the correct params', async () => {
    let mockUrl = ''
    let mockData = {crew: [{name: 'Joel', job: 'Director'}]}
    window.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({json: () => Promise.resolve({mockData})})
      );
    const expected = "https://api.themoviedb.org/3/person/1223/movie_credits?api_key=9954e71d12ad27a2cefac26f2e808e76"

    await fetchData(mockUrl)
    expect(window.fetch).toHaveBeenCalledWith(expected)
  })
})