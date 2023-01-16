import "@testing-library/jest-dom";

import {
  getImageUrl,
  getDetailsUrl,
  getCreditsUrl,
  getPopularPeopleUrl,
} from "./urlUtils";
import { env } from "../../env/client.mjs";
import { ApiConfig } from "../../types/app.types";

describe("getPopularPeopleUrl", () => {
  it("should return the correct api url to list popular details", () => {
    const expectedUrl = `${ApiConfig.API_URL}/person/popular?api_key=${env.NEXT_PUBLIC_MOVIE_DB_API_KEY}&language=en-US&page=1&include_adult=false`;
    expect(getPopularPeopleUrl()).toBe(expectedUrl);
  });
});

describe("getImageUrl", () => {
  it("should return the correct url for the given image path and size", () => {
    const imagePath = "/123456.jpg";
    const size = "w500";
    const expectedUrl = `${ApiConfig.IMAGE_BASE_URL}w500/123456.jpg`;
    expect(getImageUrl(imagePath, size)).toBe(expectedUrl);
  });
});

describe("getDetailsUrl", () => {
  it("should return the correct url for movie details", () => {
    const id = "550";
    const category = "movie";
    const expectedUrl = `${ApiConfig.API_URL}${category}/${id}?api_key=${env.NEXT_PUBLIC_MOVIE_DB_API_KEY}&language=en-US&include_adult=false`;
    expect(getDetailsUrl(id, category)).toBe(expectedUrl);
  });

  it("should return the correct url for person's details", () => {
    const id = "287";
    const category = "person";
    const expectedUrl = `${ApiConfig.API_URL}${category}/${id}?api_key=${env.NEXT_PUBLIC_MOVIE_DB_API_KEY}&language=en-US&include_adult=false`;
    expect(getDetailsUrl(id, category)).toBe(expectedUrl);
  });
});

describe("getCreditsUrl", () => {
  it("should return the correct url for movie's credits", () => {
    const id = "550";
    const category = "movie";
    const expectedUrl = `${ApiConfig.API_URL}${category}/${id}/credits?api_key=${env.NEXT_PUBLIC_MOVIE_DB_API_KEY}&language=en-US&include_adult=false`;
    expect(getCreditsUrl(id, category)).toBe(expectedUrl);
  });

  it("should return the correct url for person's credits", () => {
    const id = "287";
    const category = "person";
    const expectedUrl = `${ApiConfig.API_URL}${category}/${id}/movie_credits?api_key=${env.NEXT_PUBLIC_MOVIE_DB_API_KEY}&language=en-US&include_adult=false`;
    expect(getCreditsUrl(id, category)).toBe(expectedUrl);
  });
});
