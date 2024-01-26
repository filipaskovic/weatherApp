import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../Utils/UserContext";
import { createPortal } from "react-dom";

import "./../App.css";
import {
  USERNAME_REGEX,
  EMAIL_REGEX,
  FIRSTNAME_REGEX,
  LASTNAME_REGEX,
} from "../Utils/constants";
const About = () => {
  const { currentUser, update, closeModal, state, toggleTheme, theme } =
    useUserContext();

  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState(currentUser.username);
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(true);

  const [email, setEmail] = useState(currentUser.email);
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState(currentUser.lastName);
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const handleDisable = () => {
    const v1 = USERNAME_REGEX.test(username);
    const v2 = FIRSTNAME_REGEX.test(firstName);
    const v3 = LASTNAME_REGEX.test(lastName);
    const v4 = EMAIL_REGEX.test(email);
    if (
      currentUser.username === username &&
      currentUser.email === email &&
      currentUser.firstName === firstName &&
      currentUser.lastName === lastName
    ) {
      return true;
    }
    if (!v1 || !v2 || !v3 || !v4) {
      return true;
    }

    return false;
  };

  const upateStates = () => {
    setUsername(currentUser.username);
    setEmail(currentUser.email);
    setFirstName(currentUser.firstName);
    setLastName(currentUser.lastName);
  };
  useEffect(() => {
    upateStates();
    handleDisable();
  }, [state]);

  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = FIRSTNAME_REGEX.test(firstName);

    setValidFirstName(result);
  }, [firstName]);
  useEffect(() => {
    const result = LASTNAME_REGEX.test(lastName);
    setValidLastName(result);
  }, [lastName]);

  useEffect(() => {
    setDisabled(handleDisable());
  }, [username, firstName, lastName, email]);
  const handleEdit = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (!state?.updateError) {
      handleClose();
    }
  }, [state?.updateError]);
  const handleClose = () => {
    setShowModal(false);
    upateStates();
    closeModal();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!disabled) {
      update({ username, firstName, lastName, email });
    }
  };

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <div className='space-y-10 text-lg  p-8 rounded-2xl  drop-shadow-xl'>
      <p onClick={handleToggle}>light/dark</p>
      <h3 className='text-3xl'>About you</h3>
      <p>username: {username}</p>
      <p>email: {email}</p>
      <p>first name: {firstName}</p>
      <p>last name: {lastName}</p>

      <div className='nav flex justify-around w-full py-4'>
        <button onClick={handleEdit}>edit</button>
        <Link to='/'>Home</Link>
      </div>

      {showModal &&
        createPortal(
          <section className='fixed text-xl top-0 left-0 bottom-0 right-0 flex flex-col justify-center items-center dark:text-sky-50  dark:bg-dark-gradient bg-light-gradient'>
            <p onClick={handleToggle}>light/dark</p>
            <form
              action=''
              onSubmit={handleSubmit}
              className='flex flex-col '
              autoComplete='off'>
              <label htmlFor='username'>username</label>
              <input
                className='dark:bg-indigo-800 mb-4 mt-2 px-4 py-1 rounded-full drop-shadow-xl'
                type='text'
                id='username'
                value={username}
                aria-invalid={validUsername ? "false" : "true"}
                aria-describedby='usernameInstructions'
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
                onChange={(e) => setUsername(e.target.value)}
              />
              <p
                id='usernameInstructions'
                className={
                  usernameFocus && username && !validUsername
                    ? "instructions text-sm pl-2 pb-4 "
                    : "offscreen text-[0.0003px] pl-2 pb-4 "
                }>
                4 to 24 characters. <br />
                Must begin with a letter. <br />
                Allowed characters: a-Z, 0-9, -, _
              </p>
              <label htmlFor='email'>Email</label>
              <input
                className='dark:bg-indigo-800 mb-4 mt-2 px-4 py-1 rounded-full drop-shadow-xl'
                type='text'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby='emailInstructions'
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id='emailInstructions'
                className={
                  emailFocus && email && !validEmail
                    ? "instructions text-sm pl-2 pb-4 "
                    : "offscreen text-[0.0003px] pl-2 pb-4 "
                }>
                Email must be valid.
              </p>
              <label htmlFor='firstName'>First name</label>
              <input
                className='dark:bg-indigo-800 mb-4 mt-2 px-4 py-1 rounded-full drop-shadow-xl'
                type='text'
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                aria-invalid={validFirstName ? "false" : "true"}
                aria-describedby='firstNameInstructions'
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
              />
              <p
                id='firstNameInstructions'
                className={
                  firstNameFocus && firstName && !validFirstName
                    ? "instructions text-sm pl-2 pb-4 "
                    : "offscreen text-[0.0003px] pl-2 pb-4 "
                }>
                Minimum 3 characters
              </p>

              <label htmlFor='lastName'>Last name</label>
              <input
                className='dark:bg-indigo-800 mb-4 mt-2 px-4 py-1 rounded-full drop-shadow-xl'
                type='text'
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                aria-invalid={validLastName ? "false" : "true"}
                aria-describedby='lastNameInstructions'
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
              />
              <p
                id='lastNameInstructions'
                className={
                  lastNameFocus && lastName && !validLastName
                    ? "instructions text-sm pl-2 pb-4 "
                    : "offscreen text-[0.0003px] pl-2 pb-4 "
                }>
                Minimum 3 characters
              </p>
              {state?.updateError && (
                <p className='w-48 mb-4 pl-2 '>{state.updateError}</p>
              )}
              <div className='flex justify-between '>
                <button
                  type='submit'
                  disabled={disabled}
                  className='bg-white text-indigo-800   px-6 py-1 rounded-full disabled:opacity-25 drop-shadow-xl '>
                  save
                </button>
                <button
                  className='relative bg-red-600 text-white  px-6 py-1 rounded-full drop-shadow-xl'
                  onClick={handleClose}>
                  close
                </button>
              </div>
            </form>
          </section>,
          document.body
        )}
    </div>
  );
};

export default About;
