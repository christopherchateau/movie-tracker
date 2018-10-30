/* eslint-disable */

import React from "react";
import * as Fetch from "../fetch";
import * as Mocks from "./mocks";

describe("fetch", () => {
  it("should call fetch with the correct params", async () => {
    window.fetch = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve(Mocks.mockResults) })
      );
    const expected =
      "https://api.themoviedb.org/3/person/1223/movie_credits?api_key=9954e71d12ad27a2cefac26f2e808e76";

    Fetch.fetchData();
    expect(window.fetch).toHaveBeenCalledWith(expected);
  });

  it("calls fetch with the correct params when a user logs in", () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(Mocks.mockUserLoginResponse)
      })
    );

    const mockEmail = Mocks.mockUserLogin.email;
    const mockPassword = Mocks.mockUserLogin.password;
    const expectedFetchBody = {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({
        email: mockEmail,
        password: mockPassword
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };

    Fetch.fetchLoginUser(mockEmail, mockPassword);
    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/users",
      expectedFetchBody
    );
  });

  it("calls fetch with the correct params when a user signsup", () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(Mocks.mockUserSignUpResponse)
      })
    );

    const mockEmail = Mocks.mockUserSignup.email;
    const mockPassword = Mocks.mockUserSignup.password;
    const mockName = Mocks.mockUserSignup.username;
    const expectedFetchBody = {
      method: "POST",
      body: JSON.stringify({
        name: mockName,
        email: mockEmail,
        password: mockPassword
      }),
      headers: { "Content-Type": "application/json" }
    };

    Fetch.fetchSignupUser(mockName, mockEmail, mockPassword);
    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/users/new",
      expectedFetchBody
    );
  });

  it("calls fetch with the correct params when a user adds a favorite", () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(Mocks.mockAddMovieResponse)
      })
    );

    const mockMovie = Mocks.mockMovie;
    const expectedFetchBody = {
      method: "POST",
      body: JSON.stringify({
        movie_id: mockMovie.id,
        user_id: mockMovie.currentUser.id,
        title: mockMovie.title,
        poster_path: mockMovie.poster,
        release_date: mockMovie.date,
        vote_average: mockMovie.voteAverage,
        overview: mockMovie.overview
      }),
      headers: { "Content-Type": "application/json" }
    };

    Fetch.fetchAddFavorite(mockMovie);
    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/users/favorites/new",
      expectedFetchBody
    );
  });

  it("calls fetch with the correct params when retrieving favorites", () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(Mocks.mockRetrieveFavoritesResponse)
      })
    );

    const mockUserId = 3;

    const expected = `http://localhost:3000/api/users/${mockUserId}/favorites`;

    Fetch.retrieveUserFavorites(3);
    expect(window.fetch).toHaveBeenCalledWith(expected);
  });

  it("calls fetch with the correct params when user removes a favorite", () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(Mocks.mockRemoveFavoritesResponse)
      })
    );

    const mockUserId = 3;
    const mockMovieId = 4;

    const expectedFetchBody = {
      method: "DELETE",
      body: JSON.stringify({
        user_id: mockUserId,
        movie_id: mockMovieId
      }),
      headers: { "Content-Type": "application/json" }
    };

    Fetch.removeFavorite(mockUserId, mockMovieId);
    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/users/3/favorites/4",
      expectedFetchBody
    );
  });

  // it('should test the catch', () => {})
});
