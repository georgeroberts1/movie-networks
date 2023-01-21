import React, { useState, useEffect } from "react";

import ConnectedNodes from "../molecules/ConnectedNodes";
import { createContent, getSecondaryNodes } from "../../utils/Common";
import { getCreditsUrl } from "../../utils/api/urlUtils";
import { ConnectedNodeContainerProps } from "../../types/component.types";
import clsx from "clsx";
import Image from "next/image";
import LoadingImage from "../../styles/assets/loader.png";

const ConnectedNodeContainer = ({
  selectedDataList,
  secondaryNodeClickHandler,
  secondaryNodeFilter,
  connectionsLoading,
  targetName,
}: ConnectedNodeContainerProps) => {
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState({});

  const fetchData = async (apiUrl) => {
    setIsLoading(true);
    try {
      const res = await fetch(apiUrl, { next: { revalidate: 86400 } });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err);
      console.error(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!!!selectedDataList.length) {
      console.log("selectedDataList is empty");
      return;
    }

    const data = selectedDataList[selectedDataList.length - 1];
    const { id, type, image } = data;
    console.log("Render ConnectedNodeContainer from useEffect");

    console.log(selectedDataList);

    fetchData(getCreditsUrl(id, type));
  }, [selectedDataList]);

  if (!!!response) {
    console.log("No response");
    return;
  } else if (!response?.cast) {
    console.log("response has no cast");
    return;
  } else if (!selectedDataList.length) {
    console.log("selectedDataList is empty");
    return;
  }

  console.log("Successful response");

  const data = selectedDataList[selectedDataList.length - 1];
  const { type, image } = data;
  const primaryContent =
    type !== "movie" ? createContent(data, type, true) : undefined;

  const secondaryNodes = response?.cast
    ? getSecondaryNodes(response?.cast, type, secondaryNodeFilter)
    : [];

  return (
    <div className="flex justify-center mt-40">
      {connectionsLoading ? (
        <div className="flex justify-center items-center">
          <span className="">
            Loading connections
            <br /> for {targetName}...
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
        <ConnectedNodes
          primarySize={510}
          primaryContent={primaryContent}
          primaryType={type}
          primaryImage={image}
          secondarySize={200}
          secondaryNodeArray={secondaryNodes}
          clickHandler={secondaryNodeClickHandler}
        />
      )}
    </div>
  );
};

export default ConnectedNodeContainer;
