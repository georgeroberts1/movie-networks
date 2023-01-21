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

  const iconProps = {
    onClick: handleClick,
    className: "cursor-pointer",
  };

  return (
    <>
      <div className="h-[90px]" aria-label="proxy header"></div>
      <header>
        <div className="headerColumn">
          <span className="headerTitle">
            {headerContent || ""}
            <span className="font-light">&nbsp;{boldHeaderContent}</span>
          </span>
        </div>
        <div className="headerColumn">
          <ul className="flex flex-col-reverse items-end sm:flex-row sm:items-center space-x-4">
            {hrefArray.map((element, i) => (
              <li>
                <Link
                  key={i}
                  href={element}
                  className={clsx(href === element && "text-green-500")}
                >
                  {linkLabel(element)}
                </Link>
              </li>
            ))}
            <li className="mb-1 sm:mb-0">
              {contextState.lightMode === "light" ? (
                <BsSun {...iconProps} />
              ) : (
                <BsMoon {...iconProps} />
              )}
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
