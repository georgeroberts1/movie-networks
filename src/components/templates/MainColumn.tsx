const MainColumn = ({ isShowing, children }) => {
  return isShowing ? <div className="w-full">{children}</div> : <></>;
};

export default MainColumn;
