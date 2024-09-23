const WeatherDisplay = ({
  data,
  isCelsius,
  convertToFahrenheit,
  toggleTemperatureUnit,
}) => {
  const temperature = data.main ? data.main.temp : null;
  const currentDate = new Date().toDateString();

  return (
    <div className="middle-part">
      <div className={`temp-blk-div ${isCelsius ? "cel-div" : "far-div"}`}>
        <p>
          {isCelsius ? (
            <>
              <span className="temperature">{Math.floor(temperature)}</span>
              <span>°C</span>
            </>
          ) : (
            <>
              <span className="temperature">
                {Math.floor(convertToFahrenheit(temperature))}
              </span>
              <span>°F</span>
            </>
          )}
        </p>
        <p className="weather-type">
          {data.weather ? data.weather[0].main : null}
        </p>
        <p className="today-dt">{currentDate}</p>

        <span className="toggle-for-temp" onClick={toggleTemperatureUnit}>
          {isCelsius ? "°F" : "°C"}
        </span>
      </div>
      <div className="wind-and-humidity">
        <div className="wind">
          <h3>Wind</h3>
          <p>{data.wind ? data.wind.speed : null} km/h</p>
          <i className="fa-solid fa-wind"></i>
        </div>
        <div className="humidity">
          <i className="fa-solid fa-droplet"></i>
          <h3>Humidity</h3>
          <p>{data.main ? data.main.humidity : null}%</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
