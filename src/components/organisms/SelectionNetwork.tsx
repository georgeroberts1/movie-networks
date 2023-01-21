import { Fragment } from "react";

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
      <div className="flex flex-col">
        {targetFound ? (
          <>
            <span className="bigFeedback">
              Found in {dataListLength} link
              {dataListLength > 1 ? "s" : ""}!
            </span>
            <button className="mt-10" onClick={handleResetGame}>
              Find another name
            </button>
          </>
        ) : (
          <div className="flex justify-between">
            <span>
              Links:&nbsp;
              <span className="font-thin">{dataListLength}</span>
            </span>
            <button className="ml-10 underline" onClick={handleResetGame}>
              Find another name
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-nowrap lg:flex-wrap overflow-auto overflow-x-auto lg:overflow-x-visible transition-all">
        {selectedDataList
          .map((data, i) => {
            return (
              <Fragment key={i}>
                <Image
                  alt=""
                  height={150}
                  width={100}
                  src={data.image}
                  className={
                    targetConnectionsList.includes(data.id)
                      ? "border-gold-[300]"
                      : ""
                  }
                />
              </Fragment>
            );
          })
          .reverse()}
      </div>
    </>
  );
};

export default SelectionNetwork;
