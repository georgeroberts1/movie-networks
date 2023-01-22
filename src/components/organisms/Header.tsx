import { BsMoon, BsSun } from "react-icons/bs";
import { VscDebugRestart } from "react-icons/vsc";
import { useAppContext } from "./ContextWrapper";
import { StateReducerActions } from "../../types/app.types";
import { PageHrefs } from "../../types/app.types";
import Link from "next/link";

const Header = ({ headerContent, boldHeaderContent, href, ...props }) => {
  const [contextState, contextDispatch] = useAppContext();

  const hrefArray = Object.values(PageHrefs);
  const linkLabel = (href) => href.split("/")[1].toUpperCase();

  const handleClick = () =>
    contextDispatch({ type: StateReducerActions.SWITCH_LIGHT_MODE });
  const getDarkModeProps = {
    onClick: handleClick,
    className: "cursor-pointer",
  };

  return (
    <>
      <div className="h-[90px]" aria-label="proxy header"></div>
      <header className={contextState.lightMode === "dark" && "bg-slate-100"}>
        <div className="headerColumn">
          <span className="flex items-center headerTitle">
            {headerContent || ""}
            <span className="font-light">&nbsp;{boldHeaderContent}</span>
            {!!props.handleResetGame && (
              <VscDebugRestart
                onClick={props.handleResetGame}
                className="cursor-pointer ml-3 text-green-500 -scale-y-100 duration-500 hover:rotate-180"
              />
            )}
          </span>
        </div>
        <div className="headerColumn">
          <ul className="flex flex-col-reverse items-end sm:flex-row sm:items-center space-x-4">
            {hrefArray.map((element, i) => (
              <li>
                <Link
                  key={i}
                  href={element}
                  className={href === element && "text-green-500"}
                >
                  {linkLabel(element)}
                </Link>
              </li>
            ))}
            <li className="mb-1 sm:mb-0">
              {contextState.lightMode === "light" ? (
                <BsSun {...getDarkModeProps} />
              ) : (
                <BsMoon {...getDarkModeProps} />
              )}
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
