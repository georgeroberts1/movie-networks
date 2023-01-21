import React, { useState, useReducer, useEffect } from "react";

import ConnectedNodeContainer from "../../components/organisms/ConnectedNodeContainer";
import MainContainer from "../../components/templates/MainContainer";
import MainColumn from "../../components/templates/MainColumn";

import { SecondaryNodeModes } from "../../types/app.types";

import { StateReducerActions, PageHrefs } from "../../types/app.types";
import { buildApiUrl } from "../../utils/api/urlUtils";
import { dataListReducer } from "../../utils/Common";

import { env } from "../../env/server.mjs";

import clsx from "clsx";

export async function getStaticProps() {
  const upcomingResponse = await fetch(
    buildApiUrl("movie/upcoming", env.MOVIE_DB_API_KEY),
    {
      next: { revalidate: 604800 },
    }
  );
  const upcomingFilms = await upcomingResponse.json();
  return {
    props: {
      upcomingFilms: upcomingFilms,
    },
  };
}

export default function Home({ upcomingFilms }) {
  const [selectedDataList, dataListDispatch] = useReducer(dataListReducer, [
    {
      adult: false,
      backdrop_path: "/5kAGbi9MFAobQTVfK4kWPnIfnP0.jpg",
      genre_ids: [878, 27, 35],
      id: 536554,
      original_language: "en",
      original_title: "M3GAN",
      overview:
        "A brilliant toy company roboticist uses artificial intelligence to develop M3GAN, a life-like doll programmed to emotionally bond with her newly orphaned niece. But when the doll's programming works too well, she becomes overprotective of her new friend with terrifying results.",
      popularity: 2608.392,
      poster_path: "/d9nBoowhjiiYc4FBNtQkPY7c11H.jpg",
      release_date: "2023-01-06",
      title: "M3GAN",
      video: false,
      vote_average: 7,
      vote_count: 164,
      image: "https://image.tmdb.org/t/p/w500/d9nBoowhjiiYc4FBNtQkPY7c11H.jpg",
      type: "movie",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Render People Index from useEffect");

    console.log(selectedDataList);
  }, [selectedDataList]);

  const handleClick = (selectedData, imagePath) => {
    console.log(JSON.stringify(selectedData));
    dataListDispatch({
      type: StateReducerActions.ADD_TO_LIST,
      payload: {
        data: selectedData,
        imagePath: imagePath,
        selectionType: null,
      },
    });
  };

  return (
    <MainContainer
      boldHeaderContent={"Network"}
      href={PageHrefs.NETWORK}
      lgColumns={1}
    >
      {isLoading && <h1>Loading...</h1>}

      <MainColumn isShowing={!isLoading}>
        <ConnectedNodeContainer
          selectedDataList={selectedDataList}
          secondaryNodeClickHandler={handleClick}
          secondaryNodeFilter={SecondaryNodeModes.PROFILE}
        />
      </MainColumn>
    </MainContainer>
  );
}
