import React from "react";
import Image from "next/image";
import { ListItemProps } from "../../types/component.types";

function ListItem({
  imageSrc,
  width,
  height,
  alt,
  clickHandler,
}: ListItemProps) {
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      onClick={clickHandler}
      className="inline-flex object-contain cursor-pointer duration-100"
    ></Image>
  );
}

export default ListItem;
