import { BsMoon, BsSun } from "react-icons/bs";
import { useAppContext } from "./ContextWrapper";
import { StateReducerActions } from "../../types/app.types";
import { PageHrefs } from "../../types/app.types";
import Link from "next/link";

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
};
const titleStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: 100,
  fontSize: 30,
};

const Header = ({ headerContent, boldHeaderContent, href }) => {
  const [contextState, contextDispatch] = useAppContext();
  const handleClick = () =>
    contextDispatch({ type: StateReducerActions.SWITCH_LIGHT_MODE });

  const hrefArray = Object.values(PageHrefs);
  const linkLabel = (href) => href.split("/")[1].toUpperCase();
  const Column = ({ children, justify }) => (
    <div
      style={{
        display: "flex",
        justifyContent: justify || "space-evenly",
        alignItems: "center",
        width: "33%",
      }}
    >
      {children}
    </div>
  );

  const linkStyle = {
    margin: "0 10px",
    padding: "0 10px",
    border: "1px solid black",
    cursor: "pointer",
  };

  return (
    <header style={headerStyle}>
      <Column></Column>
      <Column>
        <span style={{ ...titleStyle }}>
          {headerContent || ""}
          <span style={{ fontWeight: 300 }}>&nbsp;{boldHeaderContent}</span>
        </span>
      </Column>
      <Column>
        <div>
          {hrefArray.map((element, i) => (
            <Link
              key={i}
              href={element}
              style={{ ...linkStyle, color: href === element && "green" }}
            >
              {linkLabel(element)}
            </Link>
          ))}
        </div>
        {contextState.lightMode === "light" ? (
          <BsSun onClick={handleClick} style={{ cursor: "pointer" }} />
        ) : (
          <BsMoon onClick={handleClick} style={{ cursor: "pointer" }} />
        )}
      </Column>
    </header>
  );
};

export default Header;
