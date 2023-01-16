import React, { useState } from "react";

import Image from "next/image";
import NodeContent from "./NodeContent";

import { PrimaryNodeProps } from "../../types/component.types";

function PrimaryNode({
  primarySize,
  alt,
  imageSrc,
  showContent,
  setShowContent,
  content,
}: PrimaryNodeProps) {
  const [primaryHovering, setPrimaryHovering] = useState(false);
  const handleMouseEnter = () => {
    setPrimaryHovering(true);
    content && setShowContent(content);
  };

  const handleMouseLeave = () => {
    setPrimaryHovering(false);
    setShowContent("");
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        textAlign: "center",
        zIndex: primaryHovering ? 3 : 2,
      }}
    >
      <NodeContent
        showContent={showContent}
        primaryHovering={primaryHovering}
      />
      <Image
        src={imageSrc}
        alt={"Picture of " + alt}
        width={primarySize}
        height={primarySize}
        priority={true}
        style={{
          objectFit: "contain",
          transitionDuration: "500ms",
          transitionProperty: "border-radius",
          borderRadius: primaryHovering ? "0" : "50%",
          opacity: primaryHovering ? 1 : showContent ? 0.4 : 1,
        }}
      ></Image>
    </div>
  );
}

export default PrimaryNode;
