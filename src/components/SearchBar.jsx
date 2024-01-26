import React, { useEffect, useRef, useState } from "react";
import search from "../assets/search.svg";
const SearchBar = ({ setCity }) => {
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(query);
    setQuery("");
  };

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className='dark:bg-indigo-800 dark:text-white px-4 py-2 rounded-full flex  drop-shadow-xl bg-slate-100 '>
      <input
        className=' bg-transparent  focus:outline-none drop-shadow-xl'
        type='text'
        placeholder='search....'
        value={query}
        ref={searchRef}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button disabled={!query} className='cursor-pointer'>
        <img src={search} alt='search icon' className='w-4 ' />
      </button>
    </form>
  );
};

export default SearchBar;
