import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../Utils/UserContext";
import moonLogo from "../assets/moonLogo.svg";

const Login = () => {
  const { login, state, toggleTheme } = useUserContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const firstFieldRef = useRef(null);

  useEffect(() => {
    firstFieldRef.current.focus();
    setErrorMessage("");
  }, []);
  useEffect(() => {
    setErrorMessage(state?.logInError);
  }, [state?.logInError]);
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };
  const handleToggle = () => {
    toggleTheme();
  };
  return (
    <section className='flex flex-col content-center items-center  '>
      <p onClick={handleToggle}>light/dark</p>
      <img src={moonLogo} alt='logo' className='w-32 pb-4' />
      <h1>Weather app</h1>
      <h3>Login</h3>

      <form className='flex flex-col' onSubmit={handleSubmit}>
        <label htmlFor='username'>username</label>
        <input
          className=' dark:bg-indigo-800 mb-4 mt-2 px-4 py-1 rounded-full drop-shadow-xl '
          type='text'
          placeholder='enter your username'
          id='username'
          ref={firstFieldRef}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor='password'>password</label>
        <input
          className=' dark:bg-indigo-800 mb-4 mt-2 px-4 py-1 rounded-full drop-shadow-xl '
          type='password'
          placeholder='enter your password'
          id='password'
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {state?.logInError && <p>{state?.logInError}</p>}
        <button
          disabled={!username || !password}
          className='bg-slate-100 text-indigo-800 rounded-full my-4 py-2'>
          Log in
        </button>
      </form>

      <Link to='/signup'> Dont have an account? Sign up</Link>
    </section>
  );
};

export default Login;
