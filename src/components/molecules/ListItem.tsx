import React from "react";
import Image from "next/image";
import { ListItemProps } from "../../types/component.types";

function ListItem({ imageSrc, alt, clickHandler }: ListItemProps) {
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width="0"
      height="0"
      sizes="100vw"
      className="cursor-pointer h-80 w-auto"
      onClick={clickHandler}
    ></Image>
  );
}

export default ListItem;
