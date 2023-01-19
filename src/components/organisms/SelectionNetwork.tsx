import { Fragment } from "react";

import Image from "next/image";
const SelectionNetwork = ({ selectedDataList, targetConnectionsList }) => {
  return (
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
                    ? "borer-gold-[300]"
                    : ""
                }
              />
            </Fragment>
          );
        })
        .reverse()}
    </div>
  );
};

export default SelectionNetwork;
