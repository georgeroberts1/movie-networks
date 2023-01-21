const MainColumn = ({ isShowing, children }) => {
  return isShowing ? <div className="w-6/12 grow">{children}</div> : <></>;
};

export default MainColumn;
