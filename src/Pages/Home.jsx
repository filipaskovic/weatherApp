import React, { useEffect, useState } from "react";
import { useUserContext } from "../Utils/UserContext";
import { Link } from "react-router-dom";
import { useWeatherData } from "../Hooks/useGetWeatherData";
import SearchBar from "../components/SearchBar";
import { useFetch } from "../Hooks/useFetch";

const Home = () => {
  const { logout, toggleTheme } = useUserContext();
  const { data, error, loading } = useWeatherData();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [searchData, searchLoading, searchError] = useFetch(city);

  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    if (searchData && !searchLoading && !searchError) {
      setWeatherData(searchData);
    }
  }, [searchData, searchLoading, searchError]);
  useEffect(() => {
    if (data) {
      setWeatherData(data);
    }
  }, [data]);
  const handleToggle = () => {
    toggleTheme();
  };
  if (searchError) {
    return (
      <div className='flex flex-col justify-center items-center'>
        {weatherData && (
          <>
            <p onClick={handleToggle}>light/dark</p>

            <h1 className='text-4xl'>Weather app</h1>
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt='weather description icon'
              className='w-24'
            />
            <p className='text-5xl pb-4 drop-shadow-xl'>
              {parseFloat((weatherData.main.temp - 273.15).toFixed(1))}°
            </p>
            <p className='pb-4 drop-shadow-xl'>
              H:{parseFloat((weatherData.main.temp_max - 273.15).toFixed(1))}°
              L:
              {parseFloat((weatherData.main.temp_min - 273.15).toFixed(1))}°
            </p>
            <p className='pb-4 drop-shadow-xl'>{weatherData.name}</p>

            <p className='pb-4 drop-shadow-xl'>
              wind speed: {weatherData.wind.speed}kmh
            </p>

            <p className='pb-4 drop-shadow-xl'>
              {weatherData.weather[0].description}
            </p>
          </>
        )}
        <SearchBar setCity={setCity} />
        <div className='nav flex justify-around w-full py-4'>
          <button
            className='drop-shadow-xl bg-red-600 px-5 py-1 rounded-full hover:bg-red-800'
            onClick={handleLogout}>
            logout
          </button>
          <Link className='drop-shadow-xl' to='/about'>
            About
          </Link>
        </div>
      </div>
    );
  }
  if (error && searchError) {
    return (
      <div>
        <p onClick={handleToggle}>light/dark</p>

        <h1 className='text-4xl'>Weather app</h1>
        <SearchBar setCity={setCity} />

        <div className='nav flex justify-around w-full py-4'>
          <button
            className='drop-shadow-xl bg-red-600 px-5 py-1 rounded-full hover:bg-red-800'
            onClick={handleLogout}>
            logout
          </button>
          <Link className='drop-shadow-xl' to='/about'>
            About
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <p>loading data...</p>
        <SearchBar setCity={setCity} />
        <div className='nav flex justify-around w-full py-4'>
          <button
            className='drop-shadow-xl bg-red-600 px-5 py-1 rounded-full hover:bg-red-800'
            onClick={handleLogout}>
            logout
          </button>
          <Link className='drop-shadow-xl' to='/about'>
            About
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      {weatherData && (
        <>
          <p onClick={handleToggle}>light/dark</p>

          <h1 className='text-4xl'>Weather app</h1>
          <img
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt='weather description icon'
            className='w-24'
          />
          <p className='text-7xl pb-4 drop-shadow-xl'>
            {parseFloat((weatherData.main.temp - 273.15).toFixed(1))}°
          </p>
          <p className='pb-4 drop-shadow-xl'>
            H:{parseFloat((weatherData.main.temp_max - 273.15).toFixed(1))}° L:
            {parseFloat((weatherData.main.temp_min - 273.15).toFixed(1))}°
          </p>
          <p className='pb-4 drop-shadow-xl'>{weatherData.name}</p>
          <p>{weatherData.sys.country}</p>

          <p className='pb-4 drop-shadow-xl'>
            wind speed: {weatherData.wind.speed}kmh
          </p>

          <p className='pb-4 drop-shadow-xl'>
            {weatherData.weather[0].description}
          </p>
        </>
      )}
      <SearchBar setCity={setCity} />
      <div className='nav flex justify-around w-full py-4'>
        <button
          className='drop-shadow-xl bg-red-600 px-5 py-1 rounded-full hover:bg-red-800'
          onClick={handleLogout}>
          logout
        </button>
        <Link className='drop-shadow-xl' to='/about'>
          About
        </Link>
      </div>
    </div>
  );
};

export default Home;
