import React, { useState, useReducer, useEffect } from "react";

import Image from "next/image";
import LoadingImage from "../../styles/assets/loader.png";

import MovieList from "../../components/organisms/MovieList";
import ConnectedNodeContainer from "../../components/organisms/ConnectedNodeContainer";
import SelectionNetwork from "../../components/organisms/SelectionNetwork";

import targets from "../../data/targetIds.json";
import MainTemplate from "../../components/templates/Main";
import Header from "../../components/organisms/Header";
import { getPeopleOneDegreeFromTarget } from "../../data/generateTargetData";

import { env } from "../../env/server.mjs";
import {
  GameStateTypes,
  ApiConfig,
  StateReducerActions,
  SecondaryNodeModes,
  PageHrefs,
} from "../../types/app.types";
import { dataListReducer } from "../../utils/Common";

const getRandomElement = (arr) => {
  console.log("Get random element");
  const targetId = arr[Math.floor(Math.random() * arr.length)];
  console.log(targets[targetId].name);
  return targetId;
};

export async function getStaticProps() {
  const upcomingResponse = await fetch(
    `${ApiConfig.API_URL}movie/upcoming?api_key=${env.MOVIE_DB_API_KEY}&language=en-US`,
    { next: { revalidate: 604800 } }
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

  const headerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 100,
    fontSize: 30,
  };

  console.log(targets[targetId]?.name);

  return (
    <MainTemplate>
      {!!targets[targetId]?.name && (
        <Header
          headerContent={"Find"}
          boldHeaderContent={targets[targetId]?.name}
          href={PageHrefs.GAME}
        />
      )}
      <div
        style={{
          display: "flex",
          width: "100vw",
          padding: "0 3%",
        }}
      >
        {!targetFound && selectedDataList.length > 0 && (
          <div
            style={{
              width: isLoading ? "100%" : "50%",
              height: "100%",
              marginTop: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!isLoading ? (
              <div className="flex justify-center align-content-center">
                <span className="">
                  Loading connections
                  <br /> for {targets[targetId].name}...
                  <br />
                  <Image
                    src={LoadingImage}
                    alt={"Movie loader"}
                    width={130}
                    height={100}
                  />
                </span>
              </div>
            ) : (
              <ConnectedNodeContainer
                selectedDataList={selectedDataList}
                targetId={targetId}
                secondaryNodeClickHandler={handleSelectionClick}
                secondaryNodeFilter={SecondaryNodeModes.GAME}
              />
            )}
          </div>
        )}
        <div
          style={{
            height: "100vh",
            width:
              targetFound || gameState === GameStateTypes.START
                ? "100%"
                : "50%",
            overflow: "auto",
            overflowY: "auto",
          }}
        >
          {selectedDataList.length === 0 ? (
            <>
              <span style={{ ...headerStyle }}>
                Start by choosing one of these upcoming movies...
              </span>
              <MovieList
                movieArray={upcomingFilmData}
                gameState={gameState}
                setGameState={setGameState}
                selectionClickHandler={handleSelectionClick}
              />
            </>
          ) : !isLoading ? (
            <>
              <span style={{ ...headerStyle }}>
                {targetFound ? (
                  `Found in ${selectedDataList.length} link${
                    selectedDataList.length > 1 ? "s" : ""
                  }!`
                ) : (
                  <>
                    <span>Links:&nbsp;</span>
                    <span style={{ fontWeight: 300 }}>
                      {selectedDataList.length}
                    </span>
                  </>
                )}
                &nbsp; &nbsp; &nbsp;
                <button onClick={handleResetGame}>Find another name</button>
              </span>
              <SelectionNetwork
                selectedDataList={selectedDataList}
                targetConnectionsList={targetConnectionsList}
              />
            </>
          ) : null}
        </div>
      </div>
    </MainTemplate>
  );
}
