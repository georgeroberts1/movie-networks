import { Fragment } from "react";

import Image from "next/image";
const SelectionNetwork = ({ selectedDataList, targetConnectionsList }) => {
  return (
    <div>
      {selectedDataList
        .map((data, i) => {
          const borderStyle = targetConnectionsList.includes(data.id)
            ? "3px solid gold"
            : "";
          return (
            <Fragment key={i}>
              <Image
                alt=""
                height={150}
                width={100}
                src={data.image}
                style={{ border: borderStyle }}
              />
            </Fragment>
          );
        })
        .reverse()}
    </div>
  );
};

export default SelectionNetwork;
