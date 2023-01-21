const MainColumn = ({ isShowing, children }) => {
  return isShowing ? <div className="min-w-[50%] grow">{children}</div> : <></>;
};

export default MainColumn;
