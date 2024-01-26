import { useState, useEffect } from "react";
import axios from "axios";
import { WEATHER_API_KEY } from "../Utils/constants";
export const useFetch = (city) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`
        );
        setData(response.data);
      } catch (error) {
        setError("Ne postoji grad");
      } finally {
        setLoading(false);
      }
    };
    if (city) {
      fetchData();
    }
  }, [city]);

  return [data, loading, error];
};
