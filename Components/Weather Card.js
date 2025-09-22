import { useState, useEffect } from "react";

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const cities = ["London", "New York", "Tokyo", "Dhaka", "Paris"];
  const descriptions = ["Sunny", "Rainy", "Cloudy", "Stormy", "Windy"];
  useEffect(() => {
    const city = cities[Math.floor(Math.random() * cities.length)];
    const temp = (Math.random() * 35).toFixed(1);
    const description =
      descriptions[Math.floor(Math.random() * descriptions.length)];
    setWeather({ city, temp, description });
  }, []);
  if (!weather) return <div>Loading Weather.......</div>;
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      <h3>{weather.city}</h3>
      <p>{weather.descriptions}</p>
      <p>{weather.temp} °C</p>
    </div>
  );
}
