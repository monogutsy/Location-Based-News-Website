function WeatherCard({
  weather,
  location,
}) {
  return (
    <div className='weather-card'>
      <h3>{location}</h3>

      <h1>
        {weather
          ? `${Math.round(
              weather.temperature
            )}°`
          : '--'}
      </h1>

      <p>
        {weather
          ? weather.weathercode === 0
            ? 'Clear Sky'
            : 'Cloudy'
          : 'Loading...'}
      </p>

      <span>
        {new Date().toLocaleDateString()}
        {' | '}
        {new Date().toLocaleTimeString(
          [],
          {
            hour: '2-digit',
            minute: '2-digit',
          }
        )}
      </span>
    </div>
  )
}

export default WeatherCard