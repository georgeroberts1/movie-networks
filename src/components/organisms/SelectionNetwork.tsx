import { Fragment } from "react";

import clsx from "clsx";

import Image from "next/image";
const SelectionNetwork = ({
  selectedDataList,
  targetConnectionsList,
  targetFound,
  handleResetGame,
}) => {
  const dataListLength = selectedDataList.length;
  return (
    <>
      <div
        className={clsx(
          "flex flex-nowrap lg:flex-wrap overflow-auto overflow-x-auto lg:overflow-x-visible lg:h-[540px] transition-all",
          targetFound && "justify-center"
        )}
      >
        {selectedDataList
          .map((data, i) => {
            return (
              <Fragment key={i}>
                <Image
                  alt=""
                  width={120}
                  height={0}
                  src={data.image}
                  className={clsx(
                    "object-contain",
                    targetConnectionsList.includes(data.id) &&
                      "border-gold-[300]"
                  )}
                />
              </Fragment>
            );
          })
          .reverse()}
      </div>
      <div className="flex justify-between">
        {targetFound ? (
          <span className="bigFeedback">
            Found in {dataListLength} link
            {dataListLength > 1 ? "s" : ""}!
          </span>
        ) : (
          <span>
            Links:&nbsp;
            <span className="font-thin">{dataListLength}</span>
          </span>
        )}
        <button className="underline" onClick={handleResetGame}>
          Find another name
        </button>
      </div>
    </>
  );
};

export default SelectionNetwork;
