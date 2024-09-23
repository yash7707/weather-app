export const fetchWeatherData = async (location, api_key) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`
  );
  if (!response.ok) throw new Error("Failed to fetch weather data");
  return await response.json();
};

export const fetchForecastData = async (location, api_key) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${api_key}`
  );
  if (!response.ok) throw new Error("Failed to fetch forecast data");
  const forecastData = await response.json();

  const dailyForecast = {};
  forecastData.list.forEach((entry) => {
    const date = new Date(entry.dt * 1000).toISOString().split("T")[0];
    if (!dailyForecast[date]) {
      dailyForecast[date] = {
        minTemp: entry.main.temp_min,
        maxTemp: entry.main.temp_max,
        weather: entry.weather[0].main,
        humidity: entry.main.humidity,
        wind: entry.wind.speed,
      };
    } else {
      dailyForecast[date].minTemp = Math.min(
        dailyForecast[date].minTemp,
        entry.main.temp_min
      );
      dailyForecast[date].maxTemp = Math.max(
        dailyForecast[date].maxTemp,
        entry.main.temp_max
      );
    }
  });

  return Object.entries(dailyForecast).map(
    ([date, { minTemp, maxTemp, weather, humidity, wind }]) => ({
      date,
      minTemp: minTemp.toFixed(1),
      maxTemp: maxTemp.toFixed(1),
      weather,
      humidity,
      wind,
    })
  );
};
