import { BsMoon, BsSun } from "react-icons/bs";
import { useAppContext } from "./ContextWrapper";
import { StateReducerActions } from "../../types/app.types";
import { PageHrefs } from "../../types/app.types";
import Link from "next/link";
import clsx from "clsx";

const Header = ({ headerContent, boldHeaderContent, href }) => {
  const [contextState, contextDispatch] = useAppContext();
  const handleClick = () =>
    contextDispatch({ type: StateReducerActions.SWITCH_LIGHT_MODE });

  const hrefArray = Object.values(PageHrefs);
  const linkLabel = (href) => href.split("/")[1].toUpperCase();
  const Column = ({ children }) => (
    <div className={clsx("flex items-center w-4/12 justify-evenly")}>
      {children}
    </div>
  );

  const iconProps = {
    onClick: handleClick,
    className: "cursor-pointer",
  };

  return (
    <header className="flex justify-between w-full">
      <Column></Column>
      <Column>
        <span className="flex justify-center items-center font-thin text-[30px]">
          {headerContent || ""}
          <span className="font-light">&nbsp;{boldHeaderContent}</span>
        </span>
      </Column>
      <Column>
        <div>
          {hrefArray.map((element, i) => (
            <Link
              key={i}
              href={element}
              className={clsx(
                "my-0 mx-[10px] py-0 px-[10px] border-black-100 cursor-pointer",
                href === element && "text-green-500"
              )}
            >
              {linkLabel(element)}
            </Link>
          ))}
        </div>
        {contextState.lightMode === "light" ? (
          <BsSun {...iconProps} />
        ) : (
          <BsMoon {...iconProps} />
        )}
      </Column>
    </header>
  );
};

export default Header;
