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
    <header>
      <div className="headerColumn">
        <span className="headerTitle">
          {headerContent || ""}
          <span className="font-light">&nbsp;{boldHeaderContent}</span>
        </span>
      </div>
      <div className="headerColumn">
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
      </div>
    </header>
  );
};

export default Header;
