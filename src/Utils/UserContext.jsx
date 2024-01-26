import React, { createContext, useContext, useReducer } from "react";
import {
  ADD_USER,
  LOGOUT,
  LOGIN,
  UPDATE_USER,
  CLOSE_MODAL,
  TOGGLE_THEME,
  initState,
} from "./constants";
import reducer, { currentUser, theme } from "./reducer";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const addUser = (user) => {
    dispatch({ type: ADD_USER, payload: user });
  };
  const logout = () => {
    dispatch({ type: LOGOUT });
  };
  const login = (user) => {
    dispatch({ type: LOGIN, payload: user });
  };
  const update = (user) => {
    dispatch({ type: UPDATE_USER, payload: user });
  };
  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };
  const toggleTheme = () => {
    dispatch({ type: TOGGLE_THEME });
  };
  return (
    <UserContext.Provider
      value={{
        addUser,
        logout,
        login,
        update,
        closeModal,
        state,
        currentUser,
        toggleTheme,
        theme,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
