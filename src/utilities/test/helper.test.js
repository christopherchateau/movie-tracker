import React from "react";
import * as Fetch from "../fetch";
import { movieCleaner } from "../helper";
import * as Mocks from "./mocks";

describe("movieCleaner", async () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(Mocks.mockResults)
      })
    );
  });

  it("should call fetchData", async () => {
    await movieCleaner();

    expect(window.fetch).toHaveBeenCalled();
  });

  it("should remove unwanted movie data", async () => {
    const expected = Mocks.mockMovies;

    const result = await movieCleaner();

    expect(result).toEqual(expected);
  });
});
