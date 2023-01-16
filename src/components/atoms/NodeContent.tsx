import React from "react";
import { useAppContext } from "../organisms/ContextWrapper";
import { NodeContentProps } from "../../types/component.types";
const NodeContent = ({ showContent, primaryHovering }: NodeContentProps) => {
  const [contextState, contextDispatch] = useAppContext();
  const { line1, line2 } = showContent || {};
  return (
    <div
      style={{
        position: "absolute",
        top: primaryHovering ? "80%" : "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        transition: "200ms",
        opacity: showContent ? 1 : 0,
        color: contextState.lightMode === "dark" ? "white" : "black",
        backdropFilter: "blur(50px)",
        padding: "5%",
        textAlign: "center",
        width: "50%",
        zIndex: 5,
      }}
    >
      <h2>{line1}</h2>
      <h3>{line2}</h3>
    </div>
  );
};

export default NodeContent;
