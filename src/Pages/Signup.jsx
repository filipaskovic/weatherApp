import React, { useEffect, useRef, useState } from "react";
import {
  USERNAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  FIRSTNAME_REGEX,
  LASTNAME_REGEX,
} from "../Utils/constants";
import { useUserContext } from "../Utils/UserContext";
import { Link } from "react-router-dom";
import moonLogo from "../assets/moonLogo.svg";
const Signup = () => {
  const { addUser, state, toggleTheme } = useUserContext();
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const firstFieldRef = useRef(null);
  const errorRef = useRef(null);
  useEffect(() => {
    firstFieldRef.current.focus();
  }, []);
  useEffect(() => {
    setErrorMessage("");
  }, []);
  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    setValidUsername(result);
  }, [username]);
  useEffect(() => {
    const result = FIRSTNAME_REGEX.test(firstName);

    setValidFirstName(result);
  }, [firstName]);
  useEffect(() => {
    const result = LASTNAME_REGEX.test(lastName);
    setValidLastName(result);
  }, [lastName]);
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);
  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);
  useEffect(() => {
    setErrorMessage("");
  }, [username, firstName, lastName, email, password]);
  useEffect(() => {
    setErrorMessage(state?.signUpError);
  }, [state?.signUpError]);
  const handleToggle = () => {
    toggleTheme();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v1 = USERNAME_REGEX.test(username);
    const v2 = FIRSTNAME_REGEX.test(firstName);
    const v3 = LASTNAME_REGEX.test(lastName);
    const v4 = EMAIL_REGEX.test(email);
    const v5 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      setErrorMessage("Invalid entry");
      return;
    }

    const user = {
      username,
      email,
      firstName,
      lastName,
      password,
    };
    addUser(user);
  };

  return (
    <section className='flex flex-row-reverse items-start  '>
      <div className='m-10 '>
        <img src={moonLogo} alt='logo' className='w-24 pb-4' />

        <h1>Weather app</h1>
        <h3>Create an account</h3>
        <p onClick={handleToggle}>light/dark</p>
      </div>

      <form className='flex flex-col' onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          className=' dark:bg-indigo-800 mb-4 mt-2 px-4 py-1 rounded-full drop-shadow-xl '
          type='text'
          id='username'
          ref={firstFieldRef}
          onChange={(e) => setUsername(e.target.value)}
          required
          aria-invalid={validUsername ? "false" : "true"}
          aria-describedby='usernameInstructions'
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
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

        <label htmlFor='password'>password</label>
        <input
          className='dark:bg-indigo-800 mb-4 mt-2 px-4 py-1 rounded-full drop-shadow-xl'
          type='password'
          id='password'
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-invalid={validPassword ? "false" : "true"}
          aria-describedby='passwordInstructions'
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <p
          id='passwordInstructions'
          className={
            passwordFocus && password && !validPassword
              ? "instructions text-sm pl-2 pb-4 "
              : "offscreen text-[0.0003px] pl-2 pb-4 "
          }>
          6-24 characters. <br />
          At least one: a, A, 0-9,
          <span aria-label='exclamation mark'>!</span>
          <span aria-label='at symbol'>@</span>
          <span aria-label='hashtag'>#</span>
          <span aria-label='dolar sign'>$</span>
          <span aria-label='percent'>%</span>.
        </p>
        <p
          ref={errorRef}
          className={errorMessage ? "errorMessage" : "offscreen"}
          aria-live='assertive'>
          {errorMessage}
        </p>
        <button
          className='bg-slate-100 text-indigo-800 rounded-full my-4 py-2'
          disabled={
            !validUsername ||
            !validEmail ||
            !validFirstName ||
            !validLastName ||
            !validPassword
          }>
          Sign up
        </button>

        <Link to='/login'> Already have an account? Log in</Link>
      </form>
    </section>
  );
};

export default Signup;
