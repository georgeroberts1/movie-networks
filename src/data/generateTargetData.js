import { getCreditsUrl, getPopularPeopleUrl } from "../utils/api/urlUtils";

const getDataFromApi = async (array, category) => {
  try {
    const responses = [];
    for (const i in array) {
      const id = array[i];
      const response = await fetch(getCreditsUrl(id, category), {
        next: { revalidate: 86400 },
      });
      responses.push(response.json());
    }
    return Promise.all(responses);
  } catch (error) {
    console.error(error);
  }
};

export const fetchPopularNames = async () => {
  const response = await fetch(getPopularPeopleUrl(), {
    next: { revalidate: 86400 },
  });
  return await response.json();
};

export const getTargetCredits = async (targetId) => {
  const targetResponse = await fetch(getCreditsUrl(targetId, "person"), {
    next: { revalidate: 86400 },
  });
  return await targetResponse.json();
};

const getIdsFromCredits = (credits) => {
  return credits.map(({ id }) => id);
};

const getCastCrewFromMovies = async (targetCredits) => {
  const movieIdList = getIdsFromCredits(targetCredits);
  let idList = [];
  return await getDataFromApi(movieIdList, "movie").then((results) => {
    results.forEach(({ cast, crew }) => {
      const castListIds = cast.map(({ id }) => id);
      const crewListIds = crew.map(({ id }) => id);
      idList = [...idList, ...castListIds, ...crewListIds];
    });
    return idList.filter((id, i) => idList.indexOf(id) === i);
  });
};

export const getPeopleOneDegreeFromTarget = async (targetId) => {
  const targetCreditData = await getTargetCredits(targetId);
  const allCredits = [...targetCreditData.cast, ...targetCreditData.cast];
  const getAllCreditsList = await getCastCrewFromMovies(allCredits);
  return getAllCreditsList;
};
