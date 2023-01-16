import React, { useState } from "react";
import Image from "next/image";
import { ListItemProps } from "../../types/component.types";
const handleNodeClick = () => alert("Expand to middle");

function ListItem({ imageSrc, size, alt, clickHandler }: ListItemProps) {
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={size}
      height={size}
      onClick={clickHandler}
      style={{
        position: "relative",
        objectFit: "contain",
        cursor: "pointer",
        // border: `solid 1px ${hovering ? "" : "white"}`,
        transition: "1s",
      }}
    ></Image>
  );
}

export default ListItem;
