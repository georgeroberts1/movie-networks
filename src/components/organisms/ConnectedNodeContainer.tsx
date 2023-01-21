import React, { useState, useEffect } from "react";

import ConnectedNodes from "../molecules/ConnectedNodes";
import { createContent, getSecondaryNodes } from "../../utils/Common";
import { getCreditsUrl } from "../../utils/api/urlUtils";
import { ConnectedNodeContainerProps } from "../../types/component.types";

const ConnectedNodeContainer = ({
  selectedDataList,
  secondaryNodeClickHandler,
  secondaryNodeFilter,
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
    <div className="flex justify-center mt-[100px] mb-10 lg:mt-8 lg:mb-0">
      <ConnectedNodes
        primarySize={350}
        primaryContent={primaryContent}
        primaryType={type}
        primaryImage={image}
        secondarySize={120}
        secondaryNodeArray={secondaryNodes}
        clickHandler={secondaryNodeClickHandler}
      />
    </div>
  );
};

export default ConnectedNodeContainer;
