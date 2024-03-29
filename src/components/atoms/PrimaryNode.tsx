import React, { useState } from "react";

import Image from "next/image";
import NodeContent from "./NodeContent";

import type { PrimaryNodeProps } from "../../types/component.types";
import clsx from "clsx";

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
      className={clsx(
        "relative text-center",
        primaryHovering ? "z-[3]" : "z-[2]"
      )}
    >
      <NodeContent
        showContent={showContent}
        primaryHovering={primaryHovering}
      />
      <Image
        src={imageSrc}
        alt={"Picture of " + alt}
        width={primarySize}
        height={0}
        priority={true}
        className={clsx(
          "object-contain rounded-full",
          primaryHovering
            ? "z-[3] rounded-none opacity-100 duration-800 transition-all"
            : showContent
            ? "opacity-40"
            : "opacity-100"
        )}
      ></Image>
    </div>
  );
}

export default PrimaryNode;
