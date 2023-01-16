import { SecondaryNodeModes, StateReducerActions } from "../types/app.types";

export const createContent = (nodeData, contentType, isCenter) => {
  const person = contentType === "person";
  const line1 = person ? nodeData?.name : `in ${nodeData?.title}`;
  const line2 =
    !isCenter && nodeData?.character ? `as ${nodeData?.character}` : "";
  return { line1: line1, line2: line2 };
};

const shuffleArray = (array) => {
  // Shuffle the array
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const filterProfilesWithImages = (array, type) => {
  const movieSelected = type === "movie";
  return array.filter((data) =>
    movieSelected ? !!data.profile_path : !!data.poster_path
  );
};

const getGameNodes = (array) => {
  //Returns a subset of 12 movies/people of the top 20 most popular according to the API in random order

  const sortByPopular = array
    .sort((a, b) => b?.popularity - a?.popularity)
    .slice(0, 12);
  const top3 = sortByPopular.slice(0, 3);
  const rest = shuffleArray(sortByPopular.slice(3, 12));
  return shuffleArray([...top3, ...rest]).slice(0, 8);
};

const NODE_MODES = SecondaryNodeModes;
export const getSecondaryNodes = (array, type, mode) => {
  switch (mode) {
    case NODE_MODES.GAME:
      return getGameNodes(filterProfilesWithImages(array, type));
    case NODE_MODES.PROFILE:
      return filterProfilesWithImages(array, type);
    default:
      return filterProfilesWithImages(array, type);
  }
};

const ACTIONS = StateReducerActions;
export const dataListReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_LIST:
      const { data, imagePath, selectionType } = action.payload;
      const type = selectionType
        ? selectionType
        : state[state.length - 1].type === "movie"
        ? "person"
        : "movie";

      return [
        ...state,
        {
          ...data,
          image: imagePath,
          type: type,
        },
      ];
    case ACTIONS.CLEAR_LIST:
      return [];
    default:
      return state;
  }
};
