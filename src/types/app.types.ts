export enum ApiConfig {
  API_URL = "https://api.themoviedb.org/3/",
  IMAGE_BASE_URL = "https://image.tmdb.org/t/p/",
}

export enum GameStateTypes {
  START = "START",
  TARGET_CHOSEN = "TARGET_CHOSEN",
  FILM_CHOSEN = "FILM_CHOSEN",
  TARGET_FOUND = "TARGET_FOUND",
}

export enum SecondaryNodeModes {
  GAME = "GAME",
  PROFILE = "PROFILE",
}

export enum StateReducerActions {
  ADD_TO_LIST = "ADD_TO_LIST",
  CLEAR_LIST = "CLEAR_LIST",
  SWITCH_LIGHT_MODE = "SWITCH_LIGHT_MODE",
}

export enum PageHrefs {
  NETWORK = "/network",
  GAME = "/game",
}
