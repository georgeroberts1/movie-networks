import { Fragment } from "react";

import Image from "next/image";
const SelectionNetwork = ({
  selectedDataList,
  targetConnectionsList,
  targetFound,
  handleResetGame,
}) => {
  return (
    <>
      <span className="bigFeedback">
        {targetFound ? (
          `Found in ${selectedDataList.length} link${
            selectedDataList.length > 1 ? "s" : ""
          }!`
        ) : (
          <>
            <span>Links:&nbsp;</span>
            <span className="font-thin">{selectedDataList.length}</span>
          </>
        )}
        &nbsp; &nbsp; &nbsp;
        <button onClick={handleResetGame}>Find another name</button>
      </span>
      <div>
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
