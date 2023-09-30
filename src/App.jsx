import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleButtonClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // animation duration in milliseconds
  };

  const [city, setCity] = useState("hyderabad");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");

  const hotBg = `https://source.unsplash.com/1920x1080/?summer`;
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const coldBg = "https://source.unsplash.com/1920x1080/?ice";
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "c";
    button.innerText = isCelsius ? "°f" : "°c";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const handleSearch = () => {
    const input = document.getElementById("city-input");
    setCity(input.value);
    input.blur();
  };

  return (
    <div
      className="p-7 flex flex-col justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex justify-center items-center">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative flex flex-col justify-center mx-auto p-4 md:p-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 rounded-2xl md:max-w-[600px] w-full">
          {weather && (
            <div className="space-y-4 m-1 md:m-7">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <input
                  type="text"
                  id="city-input"
                  name="city"
                  placeholder="Enter city..."
                  className="text-white border border-gray-300 px-2 py-1 rounded-lg w-full md:w-3/4 focus:outline-none focus:border-white bg-gradient-to-r from-purple-500 to-blue-600 to-pink-500"
                  onChange={(e) => setCity(e.target.value)}
                />
                <button
                  onClick={handleUnitsClick}
                  className={`px-4 py-2 mr-4 text-white text-[40px] font-bold hover:text-yellow-400 transition duration-500 ease-in-out transform ${
                    isAnimating ? "animate-bounce" : ""
                  }`}
                >
                  {units === "metric" ? "°F" : "°C"}
                </button>
                <button
                  onClick={handleSearch}
                  className="w-[120px] bg-gradient-to-r from-purple-600 to-pink-600 hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 transition-transform duration-300 transform-gpu hover:scale-110 text-white font-bold py-2 px-4 rounded"
                >
                  Search
                </button>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <div className="flex justify-center items-center space-x-6 pl-1 md:space-x-4">
                  <h3 className="font-medium text-white text-lg">
                    {weather.name}, {weather.country}
                  </h3>
                  <img
                    src={weather.iconURL}
                    alt="weatherIcon"
                    className="w-12 h-12"
                  />
                  <h3 className="font-medium text-white text-lg">
                    {weather.description}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-bold text-4xl text-white">
                    {weather.temp.toFixed()}°{units === "metric" ? "C" : "F"}
                  </h1>
                </div>
              </div>

              <Descriptions weather={weather} units={units} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
