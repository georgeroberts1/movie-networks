import { env as clientEnv } from "../../env/client.mjs";
import { ApiConfig } from "../../types/app.types";

export const getImageUrl = (imagePath, size) =>
  ApiConfig.IMAGE_BASE_URL + size + imagePath;

export const buildApiUrl = (middle, api_key) =>
  ApiConfig.API_URL +
  middle +
  `?api_key=${api_key}&language=en-US&include_adult=false`;

export const getDetailsUrl = (id, type) =>
  buildApiUrl(type + "/" + id, clientEnv.NEXT_PUBLIC_MOVIE_DB_API_KEY);

export const getCreditsUrl = (id, type) => {
  const pathPrefix = type === "movie" ? "/credits" : "/movie_credits";
  return buildApiUrl(
    type + "/" + id + pathPrefix,
    clientEnv.NEXT_PUBLIC_MOVIE_DB_API_KEY
  );
};

export const StaticUrls = {
  popularPeople: buildApiUrl(
    "/person/popular",
    clientEnv.NEXT_PUBLIC_MOVIE_DB_API_KEY
  ),
};
