const Forecast = ({ dataForecast, isCelsius, convertToFahrenheit }) => {
  const weatherIconMap = {
    Clear: "https://cdn-icons-png.flaticon.com/128/4814/4814268.png",
    Clouds: "https://cdn-icons-png.flaticon.com/128/1146/1146869.png",
    Rain: "https://cdn-icons-png.flaticon.com/128/4724/4724094.png",
    Snow: "https://cdn-icons-png.flaticon.com/128/2315/2315309.png",
    Haze: "https://cdn-icons-png.flaticon.com/128/1146/1146869.png",
    Mist: "https://cdn-icons-png.flaticon.com/128/1146/1146869.png",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="bottom-part">
      <h3>5 Days Forecast</h3>
      <div className="future-main">
        {dataForecast.map((forecast, index) => (
          <div
            className={`future-forecasts ${forecast.weather.toLowerCase()}`}
            key={index}
          >
            <div className="inner-div">
              <h3 className="date">{formatDate(forecast.date)}</h3>
              <img
                src={
                  weatherIconMap[forecast.weather] ||
                  "https://cdn-icons-png.flaticon.com/128/4814/4814268.png"
                }
                alt={forecast.weather}
              />
              <div className="weather-main">
                <p>{forecast.weather}</p>
              </div>
            </div>
            <div className="details-div">
              <p className="weather-type-fore">
                Min Temp:{" "}
                {isCelsius
                  ? `${forecast.minTemp}°C`
                  : `${convertToFahrenheit(forecast.minTemp).toFixed(1)}°F`}
              </p>
              <p className="weather-type-fore">
                Max Temp:
                {isCelsius
                  ? `${forecast.maxTemp}°C`
                  : `${convertToFahrenheit(forecast.maxTemp).toFixed(1)}°F`}
              </p>
              <p className="weather-type-fore">
                Humidity: {forecast.humidity}%
              </p>
              <p className="weather-type-fore">Wind: {forecast.wind} km/h</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
