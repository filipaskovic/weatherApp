import { useState, useEffect } from "react";
import axios from "axios";
import { IP_API_KEY, WEATHER_API_KEY } from "../Utils/constants";

export function useWeatherData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async (url) => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchData(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
        );
      },
      () => {
        axios
          .get(`https://api.ipdata.co?api-key=${IP_API_KEY}`)
          .then((response) => {
            const { latitude, longitude } = response.data;
            fetchData(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
            );
          })
          .catch((error) => {
            setError(error);
          });
      }
    );
  }, []);

  return { data, loading, error };
}
