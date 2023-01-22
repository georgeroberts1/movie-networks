import React from "react";
import type { NodeContentProps } from "../../types/component.types";
import clsx from "clsx";
const NodeContent = ({ showContent, primaryHovering }: NodeContentProps) => {
  const { line1, line2 } = showContent || {};
  return (
    <div
      className={clsx(
        "absolute left-[50%] duration-200 backdrop-blur-[50%] p-[5%] text-center w-6/12 z-[5] translate-x-[-50%] translate-y-[-50%]",
        showContent ? "opacity-100" : "opacity-0",
        primaryHovering ? "top-[80%]" : "top-[50%]"
      )}
    >
      <div className="nodeContentContainer">
        <p>{line1}</p>
        {line2 && <p>{line2}</p>}
      </div>
    </div>
  );
};

export default NodeContent;
