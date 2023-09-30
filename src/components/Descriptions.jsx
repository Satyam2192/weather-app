import React from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaWind,
  FaTint,
  FaThermometerHalf,
} from "react-icons/fa";
import { BiHappy } from "react-icons/bi";

const Descriptions = ({ weather, units }) => {
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "m/h";

  const cards = [
    {
      id: 1,
      icon: <FaArrowDown className="text-red-600 text-2xl animate-ping" />,
      title: "Min Temperature",
      data: weather.temp_min.toFixed(),
      unit: tempUnit,
    },
    {
      id: 2,
      icon: <FaArrowUp className="text-green-600 text-2xl animate-pulse" />,
      title: "Max Temperature",
      data: weather.temp_max.toFixed(),
      unit: tempUnit,
    },
    {
      id: 3,
      icon: <BiHappy className="text-yellow-500 text-2xl animate-bounce" />,
      title: "Feels Like",
      data: weather.feels_like.toFixed(),
      unit: tempUnit,
    },
    {
      id: 4,
      icon: <FaThermometerHalf className="text-blue-500 text-2xl animate-wiggle" />,
      title: "Pressure",
      data: weather.pressure,
      unit: "hPa",
    },
    {
      id: 5,
      icon: <FaTint className="text-blue-400 text-2xl animate-pulse-fast" />,
      title: "Humidity",
      data: weather.humidity,
      unit: "%",
    },
    {
      id: 6,
      icon: <FaWind className="text-pink-500 text-2xl animate-spin-slow" />,
      title: "Wind Speed",
      data: weather.speed.toFixed(),
      unit: windUnit,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {cards.map(({ id, icon, title, data, unit }) => (
        <div
          key={id}
          className="bg-white bg-opacity-[40%] pb-3 text-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
        >
          <div className="p-6 flex items-center justify-center">
            {icon}
            <small className="text-gray-500 ml-2 font-medium">{title}</small>
          </div>
          <h2 className="text-center text-3xl font-bold">
            <span className="text-5xl font-extrabold">{data}</span> {unit}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Descriptions;
