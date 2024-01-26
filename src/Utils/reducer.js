import validateUser from "./validateUser";
import {
  ADD_USER,
  LOGOUT,
  LOGIN,
  UPDATE_USER,
  CLOSE_MODAL,
  TOGGLE_THEME,
} from "./constants";

export let currentUsers = JSON.parse(localStorage.getItem("users")) || [];
export let currentUser =
  JSON.parse(localStorage.getItem("currentUser")) || null;

const setCurrentUser = (user) => {
  currentUser = user;
  localStorage.setItem("currentUser", JSON.stringify(user));
};

const updateLocalStorage = (users) => {
  currentUsers = users;
  localStorage.setItem("users", JSON.stringify(users));
};

const userExist = (currentUsers, action) => {
  return currentUsers?.find(
    (user) =>
      user.username === action.username && user.password === action.password
  );
};

export let theme = JSON.parse(localStorage.getItem("theme")) || null;

const updateTheme = (updatedTheme) => {
  document.documentElement.classList.add(updatedTheme);
  localStorage.setItem("theme", JSON.stringify(updatedTheme));

  document.documentElement.classList.remove(theme);
  theme = updatedTheme;
};
export default (state, action) => {
  switch (action.type) {
    case ADD_USER:
      let validateResult = validateUser(action.payload, currentUsers);
      if (validateResult) {
        return { ...state, signUpError: validateResult };
      } else {
        validateResult = null;
        const newUser = {
          ...action.payload,
          id: crypto.randomUUID(),
        };
        const updatedUsers = [...currentUsers, newUser];

        updateLocalStorage(updatedUsers);
        setCurrentUser(newUser);
        return { ...updatedUsers, signUpError: validateResult };
      }
    case LOGOUT:
      setCurrentUser(null);
      return updateLocalStorage;
    case LOGIN:
      const doesUserExist = userExist(currentUsers, action.payload);
      if (doesUserExist) {
        setCurrentUser(doesUserExist);
        return { ...state, logInError: "" };
      } else {
        return { ...state, logInError: "incorrect username or password" };
      }
    case UPDATE_USER:
      let existingUsersWithoutCurrent = currentUsers.filter(
        (locUser) => locUser.id !== currentUser.id
      );
      let validaTeResult = validateUser(
        action.payload,
        existingUsersWithoutCurrent
      );
      if (validaTeResult) {
        return {
          ...state,
          updateError: validaTeResult,
        };
      } else {
        const updatedUser = {
          ...action.payload,
          password: currentUser.password,
          id: currentUser.id,
        };
        const updatedUsers = currentUsers.map((user) => {
          if (user.id === updatedUser.id) return updatedUser;
          else return user;
        });
        setCurrentUser(updatedUser);

        updateLocalStorage(updatedUsers);
        return { ...state, updateError: "" };
      }
    case CLOSE_MODAL:
      return { ...state, updateError: "" };
    case TOGGLE_THEME:
      if (theme === "light") {
        updateTheme("dark");
        return;
      }
      if (theme === "dark") {
        updateTheme("light");

        return;
      }
      if (!theme) {
        updateTheme("light");

        return;
      }
    default:
      return state;
  }
};
