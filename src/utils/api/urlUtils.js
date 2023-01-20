import { env } from "../../env/client.mjs";
import { ApiConfig } from "../../types/app.types";

export const getImageUrl = (imagePath, size) =>
  ApiConfig.IMAGE_BASE_URL + size + imagePath;

export const getDetailsUrl = (id, type) =>
  `${ApiConfig.API_URL}${type}/${id}?api_key=${env.NEXT_PUBLIC_MOVIE_DB_API_KEY}&language=en-US&include_adult=false`;

export const getCreditsUrl = (id, type) => {
  const pathPrefix = type === "movie" ? "credits" : "movie_credits";
  return `${ApiConfig.API_URL}${type}/${id}/${pathPrefix}?api_key=${env.NEXT_PUBLIC_MOVIE_DB_API_KEY}&language=en-US&include_adult=false`;
};

export const getPopularPeopleUrl = () =>
  `${ApiConfig.API_URL}/person/popular?api_key=${env.NEXT_PUBLIC_MOVIE_DB_API_KEY}&language=en-US&page=1&include_adult=false`;

export const StaticUrls = {
  upcomingMovies: `${ApiConfig.API_URL}movie/upcoming?api_key=${env.MOVIE_DB_API_KEY}&language=en-US`,
};
