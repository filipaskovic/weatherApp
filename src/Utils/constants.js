export const initState = {
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  logged: false,
};

export const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
export const FIRSTNAME_REGEX = /^[A-Za-zščćžđŠĐČĆŽ\s]{3,}$/;
export const LASTNAME_REGEX = /^[A-Za-zščćžđŠĐČĆŽ\s]{3,}$/;
export const EMAIL_REGEX = /^[A-Za-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;

export const ADD_USER = "ADD_USER";
export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const UPDATE_USER = "UPDATE_USER";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const TOGGLE_THEME = "TOGGLE_THEME";

export const WEATHER_API_KEY = `bda149b88801734b5e61e9d4a5a9816a`;
export const IP_API_KEY =
  "c46584adcfb4cb4fac76ed2e6c511f78e2dc299bb5bd4f4c3391c686";
