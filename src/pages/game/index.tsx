import clsx from "clsx";

import React, { useState, useReducer, useEffect } from "react";

import Image from "next/image";
import LoadingImage from "../../styles/assets/loader.png";

import MovieList from "../../components/organisms/MovieList";
import ConnectedNodeContainer from "../../components/organisms/ConnectedNodeContainer";
import SelectionNetwork from "../../components/organisms/SelectionNetwork";

import targets from "../../data/targetIds.json";
import MainTemplate from "../../components/templates/MainTemplate";
import { getPeopleOneDegreeFromTarget } from "../../data/generateTargetData";

import { buildApiUrl } from "../../utils/api/urlUtils";
import { dataListReducer } from "../../utils/Common";
import { env } from "../../env/server.mjs";

import {
  GameStateTypes,
  StateReducerActions,
  SecondaryNodeModes,
  PageHrefs,
} from "../../types/app.types";

const getRandomElement = (arr) => {
  console.log("Get random element");
  const targetId = arr[Math.floor(Math.random() * arr.length)];
  console.log(targets[targetId].name);
  return targetId;
};

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
  const [selectedDataList, dataListDispatch] = useReducer(dataListReducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const [targetId, setTargetId] = useState();
  const [targetConnectionsList, setTargetConnectionsList] = useState();
  const [gameState, setGameState] = useState(GameStateTypes.START);

  const handleResetGame = () => {
    dataListDispatch({ type: StateReducerActions.CLEAR_LIST });
    setIsLoading(false);
    setTargetId();
    setGameState(GameStateTypes.START);
  };

  const resetTargetConnections = async (id) => {
    setIsLoading(true);
    const result = await getPeopleOneDegreeFromTarget(id);
    console.log(result);
    setTargetConnectionsList(result);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("Render Game Index from useEffect");

    console.log("gameState:", gameState);
    console.log("isLoading:", isLoading);

    if (gameState === GameStateTypes.START) {
      const nextTargetId = getRandomElement(Object.keys(targets));
      console.log("Setting targetId", nextTargetId);
      setTargetId(nextTargetId);
      console.log("Called resetTargetConnections");
      resetTargetConnections(nextTargetId);
    }
  }, [gameState]);

  const upcomingFilmData = upcomingFilms.results;
  const targetFound = gameState === "TARGET_FOUND";

  const handleSelectionClick = (selectedData, imagePath, type) => {
    selectedData.id === parseInt(targetId) &&
      setGameState(GameStateTypes.TARGET_FOUND);

    !!!type &&
      console.log(
        `,"${selectedData.id}": {"name": "${selectedData.name}", "poster_path": "${imagePath}"}`
      );

    dataListDispatch({
      type: StateReducerActions.ADD_TO_LIST,
      payload: {
        data: selectedData,
        imagePath: imagePath,
        selectionType: type,
      },
    });
  };

  return (
    <MainTemplate
      headerContent="Find"
      boldHeaderContent={targets[targetId]?.name || ""}
      href={PageHrefs.GAME}
    >
      {/* Node container */}
      {!targetFound && selectedDataList.length > 0 && (
        <div
          className={clsx(
            "flex justify-center items-center h-full mt-40",
            isLoading ? "w-full" : "w-6/12"
          )}
        >
          <ConnectedNodeContainer
            selectedDataList={selectedDataList}
            secondaryNodeClickHandler={handleSelectionClick}
            secondaryNodeFilter={SecondaryNodeModes.GAME}
            connectionsLoading={isLoading}
            targetName={targets[targetId].name}
          />
        </div>
      )}
      {/* MovieList */}
      <div
        className={clsx(
          "h-screen w-full justify-center overflow-auto overflow-y-auto",
          targetFound || gameState === GameStateTypes.START
            ? "w-full"
            : "w-6/12"
        )}
      >
        {selectedDataList.length === 0 && (
          <MovieList
            movieArray={upcomingFilmData}
            gameState={gameState}
            setGameState={setGameState}
            selectionClickHandler={handleSelectionClick}
          />
        )}

        {!isLoading && (
          <SelectionNetwork
            selectedDataList={selectedDataList}
            targetConnectionsList={targetConnectionsList}
            targetFound={targetFound}
            handleResetGame={handleResetGame}
          />
        )}
      </div>
    </MainTemplate>
  );
}
