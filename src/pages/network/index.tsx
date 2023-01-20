import React, { useState, useReducer, useEffect } from "react";

import ConnectedNodeContainer from "../../components/organisms/ConnectedNodeContainer";
import MainTemplate from "../../components/templates/MainTemplate";
import Header from "../../components/organisms/Header";

import { SecondaryNodeModes } from "../../types/app.types";

import { StateReducerActions, PageHrefs } from "../../types/app.types";
import { StaticUrls } from "../../utils/api/urlUtils";
import { dataListReducer } from "../../utils/Common";

import clsx from "clsx";

export async function getStaticProps() {
  const upcomingResponse = await fetch(StaticUrls.upcomingMovies, {
    next: { revalidate: 604800 },
  });
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
    <MainTemplate>
      <Header boldHeaderContent={"Network"} href={PageHrefs.NETWORK} />
      <div
        className={clsx(
          "flex items-center h-full mt-40",
          isLoading ? "w-full" : "w-6/12"
        )}
      >
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <ConnectedNodeContainer
            selectedDataList={selectedDataList}
            secondaryNodeClickHandler={handleClick}
            secondaryNodeFilter={SecondaryNodeModes.PROFILE}
          />
        )}
      </div>
    </MainTemplate>
  );
}
