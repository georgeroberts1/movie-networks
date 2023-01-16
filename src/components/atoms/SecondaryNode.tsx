import React, { useState } from "react";

import { SecondaryNodeProps } from "../../types/component.types";
import Image from "next/image";

const getCoordinates = (number, total, center, radius) => {
  const quarter = total / 4;
  const half = total / 2;
  const x = (radius - 30) * Math.sin((number - quarter) * (Math.PI / half));
  const y = -(radius - 20) * Math.cos((number - quarter) * (Math.PI / half));
  return [x + center, y + center];
};

function SecondaryNode({
  index,
  primarySize,
  secondarySize,
  totalCount,
  imageSrc,
  alt,
  imageType,
  setShowContent,
  clickHandler,
  content,
}: SecondaryNodeProps) {
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
    setShowContent(content);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    setShowContent("");
  };

  const center = Math.round((primarySize - secondarySize) / 2);
  const distanceFromCenter = primarySize - secondarySize + 15;

  const [x, y] = getCoordinates(
    index + 1,
    totalCount,
    center,
    hovering ? distanceFromCenter - 10 : distanceFromCenter
  );

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={clickHandler}
        style={{
          position: "absolute",
          width: `${hovering ? secondarySize * 1.2 : secondarySize}px`,
          height: `${hovering ? secondarySize * 1.2 : secondarySize}px`,
          cursor: "pointer",
          top: 0,
          transform: `translate(${x}px, ${y}px)`,
          transition: "500ms",
          zIndex: 4,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: 0,
          transform: `translate(${x}px, ${y}px)`,
          transition: "500ms",
          zIndex: hovering ? 3 : y > 0 ? 2 : 1,
        }}
      >
        <Image
          src={imageSrc}
          alt={"Picture of " + alt}
          width={hovering ? secondarySize * 1.2 : secondarySize}
          height={hovering ? secondarySize * 1.2 : secondarySize}
          priority={false}
          quality={50}
          style={{
            objectFit: "contain",
            borderRadius: `${imageType === "movie" ? "" : "50%"}`,
            transition: "300ms",
          }}
        ></Image>
      </div>
    </>
  );
}

export default SecondaryNode;
