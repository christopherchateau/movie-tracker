/* eslint-disable */

import React from 'react';
import * as Fetch from '../fetch';
import * as Mocks from './mocks'


describe('fetchData', () => {
  it('should call fetch with the correct params', async () => {
    // let mockData = {crew: [{name: 'Joel', job: 'Director'}]}
    window.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({json: () => Promise.resolve(Mocks.mockResults)})
      );
    const expected = "https://api.themoviedb.org/3/person/1223/movie_credits?api_key=9954e71d12ad27a2cefac26f2e808e76"

    Fetch.fetchData()
    expect(window.fetch).toHaveBeenCalledWith(expected)
  })
})

  it('calls fetch with the correct params when a user logs in', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(Mocks.mockUserLoginResponse)
    }));

    const mockEmail = Mocks.mockUserLogin.email
    const mockPassword = Mocks.mockUserLogin.password
    const expectedFetchBody = {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({
        email: mockEmail,
        password: mockPassword
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    Fetch.fetchLoginUser(mockEmail, mockPassword)
    expect(window.fetch).toHaveBeenCalledWith("http://localhost:3000/api/users", expectedFetchBody)
  })

  it('calls fetch with the correct params when a user signsup', () => {
  })

  it('calls fetch with the correct params when a user adds a favorite', () => {
  })

  it('calls fetch with the correct params when retrieving favorites', () => {
  })

  it('calls fetch with the correct params when user removes a favorite', () => {
  })