import * as actions from "../index.js";

describe("actions", () => {
  it("should have a type of LOAD_MOVIES", () => {
    const movies = [];
    const expectedAction = {
      type: "LOAD_MOVIES",
      movies
    };

    const result = actions.loadMovies(movies);
    expect(result).toEqual(expectedAction);
  });

  it("should have a type of DISPLAY_FAVORITES", () => {
    const displayFavorites = false;
    const expectedAction = {
      type: "DISPLAY_FAVORITES",
      displayFavorites
    };

    const result = actions.displayFavorites(displayFavorites);
    expect(result).toEqual(expectedAction);
  });

  it("should have a type of TOGGLE_LOGIN", () => {
    const loggedIn = false;
    const expectedAction = {
      type: "TOGGLE_LOGIN",
      loggedIn
    };

    const result = actions.logIn(loggedIn);
    expect(result).toEqual(expectedAction);
  });

  it("should have a type of SAVE_USERDATA", () => {
    const name = "Taylor";
    const expectedAction = {
      type: "SAVE_USERDATA",
      currentUser: name
    };

    const result = actions.saveUserData(name);
    expect(result).toEqual(expectedAction);
  });

  it("should have a type of TOGGLE_FAVORITE", () => {
    const id = 3;
    const expectedAction = {
      type: "TOGGLE_FAVORITE",
      id
    };

    const result = actions.toggleFavorite(id);
    expect(result).toEqual(expectedAction);
  });

  it("should have a type of RESET_FAVORITES", () => {
    const expectedAction = {
      type: "RESET_FAVORITES"
    };

    const result = actions.resetFavorites();
    expect(result).toEqual(expectedAction);
  });

  it("should have a type of SET_ERROR_MESSAGE", () => {
    const errorMessage = "Invalid login";
    const expectedAction = {
      type: "SET_ERROR_MESSAGE",
      errorMessage
    };

    const result = actions.setErrorMessage(errorMessage);
    expect(result).toEqual(expectedAction);
  });
});
