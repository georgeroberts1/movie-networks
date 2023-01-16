// src/context/state.js
import React, { createContext, useContext, useReducer } from "react";
import { StateReducerActions } from "../../types/app.types";

const AppContext = createContext([]);

const contextReducer = (state, actions) => {
  switch (actions.type) {
    case StateReducerActions.SWITCH_LIGHT_MODE:
      return { lightMode: state["lightMode"] === "light" ? "dark" : "light" };
    default:
      return state;
  }
};

export function ContextWrapper({ children }) {
  const [contextState, contextDispatch] = useReducer(contextReducer, {
    lightMode: "light",
  });

  return (
    <AppContext.Provider value={[contextState, contextDispatch]}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
