import "./mainpage.css";
import react, { useState, useEffect } from "react";
import { fetchWeatherData, fetchForecastData } from "./FunctionToFetchData";
import ErrorBox from "./ErrorBox";
import Search from "./Search";
import WeatherDisplay from "./WeatherDisplay";
import Forecast from "./Forecast";
import Loader from "./Loader"; // Import Loader

const MainPage = () => {
  const api_key = "a554ae31a2df648315daa6e0871442a9";
  const [data, setData] = useState({});
  const [dataForecast, setDataForecast] = useState([]);
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);

  const addError = (error) => {
    setErrors((prevErrors) => [...prevErrors, error]);
    setTimeout(() => {
      setErrors((prevErrors) => prevErrors.filter((e) => e !== error));
    }, 5000);
  };

  const search = async () => {
    if (location) {
      setLoading(true); // Set loading to true
      try {
        const weatherData = await fetchWeatherData(location, api_key);
        setData(weatherData);

        const forecastData = await fetchForecastData(location, api_key);
        setDataForecast(forecastData);
        setLocation(""); // Clear the input field after search
      } catch (error) {
        addError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchDefaultLocation = async () => {
      setLoading(true); // Set loading to true
      const defaultLoc = "delhi";
      try {
        const weatherData = await fetchWeatherData(defaultLoc, api_key);
        setData(weatherData);

        const forecastData = await fetchForecastData(defaultLoc, api_key);
        setDataForecast(forecastData);
      } catch (error) {
        addError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultLocation();
  }, []);

  const convertToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
  };

  const currentWeatherClass = data.weather
    ? data.weather[0].main.toLowerCase()
    : "some-error";

  return (
    <>
      <ErrorBox errors={errors} isVisible={errors.length > 0} />
      {loading ? (
        <Loader />
      ) : (
        <div className={`weather-blk ${currentWeatherClass}`}>
          <div className="overlay-div">
            <Search
              data={data}
              location={location}
              setLocation={setLocation}
              search={search}
            />
            <div className="flex-div">
              <WeatherDisplay
                data={data}
                isCelsius={isCelsius}
                convertToFahrenheit={convertToFahrenheit}
                toggleTemperatureUnit={toggleTemperatureUnit}
              />
              <Forecast
                dataForecast={dataForecast}
                isCelsius={isCelsius}
                convertToFahrenheit={convertToFahrenheit}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
