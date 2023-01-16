import React, { useState } from "react";
import PrimaryNode from "../atoms/PrimaryNode";
import SecondaryNode from "../atoms/SecondaryNode";
import { getImageUrl } from "../../utils/api/urlUtils";
import { createContent } from "../../utils/Common";
import {
  SecondaryNodeData,
  ConnectedNodeProps,
} from "../../types/component.types";

function ConnectedNodes({
  primaryImage,
  secondaryNodeArray,
  clickHandler,
  primarySize,
  secondarySize,
  primaryContent,
  primaryType,
}: ConnectedNodeProps) {
  const [showContent, setShowContent] = useState({});

  const secondaryNodePropsArray = secondaryNodeArray.map(
    (nodeData: SecondaryNodeData, i: number) => {
      const secondaryNodeType = primaryType === "movie" ? "person" : "movie";

      const imagePath =
        secondaryNodeType === "person"
          ? nodeData.profile_path
          : nodeData.poster_path;
      const imageSrc = getImageUrl(imagePath, "w500");
      const secondaryContent = createContent(
        nodeData,
        secondaryNodeType,
        false
      );

      return {
        index: i,
        primarySize: primarySize,
        secondarySize: secondarySize,
        totalCount: secondaryNodeArray.length,
        imageSrc: imageSrc,
        alt: secondaryNodeType === "movie" ? nodeData.title : nodeData.name,
        content: secondaryContent,
        imageType: secondaryNodeType,
        setShowContent: setShowContent,
        clickHandler: () => clickHandler(nodeData, imageSrc, secondaryNodeType),
      };
    }
  );

  return (
    <div style={{ position: "relative" }}>
      <PrimaryNode
        primarySize={primarySize}
        alt={"alt"}
        imageSrc={primaryImage}
        content={primaryContent}
        showContent={showContent}
        setShowContent={setShowContent}
      />
      {secondaryNodePropsArray.map((props, i) => (
        <SecondaryNode key={i} {...props} />
      ))}
    </div>
  );
}

export default ConnectedNodes;
