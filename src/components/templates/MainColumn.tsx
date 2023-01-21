const MainColumn = ({ isShowing, children }) => {
  return isShowing ? <div className="w-6/12">{children}</div> : <></>;
};

export default MainColumn;
