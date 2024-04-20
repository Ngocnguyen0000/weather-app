import React, { useCallback, useState } from "react";
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';
import cloud_icon from '../Assets/cloud.png';
// Import other weather icons
import clear_icon from '../Assets/clear.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';

const WeatherApp = () => {
    const api_key = "155a84ece2d9a22e9d1289edaadfca51";

    const [weatherData, setWeatherData] = useState({
        humidity: 0,
        windSpeed: 0,
        temperature: 0,
        location: "",
        icon: cloud_icon // Default weather icon
    });

    const search = useCallback(async () => {
        const element = document.getElementsByClassName("cityInput")[0];
        if (element.value === "") {
            return;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${api_key}`;

        try {
            let response = await fetch(url);
            let data = await response.json();

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: Math.floor(data.wind.speed),
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: getWeatherIcon(data.weather[0].icon)
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }, []);

    const getWeatherIcon = (iconCode) => {
        switch (iconCode) {
            case "01d":
            case "01n":
                return clear_icon;
            case "02d":
            case "02n":
            case "03d":
            case "03n":
                return cloud_icon;
            case "04d":
            case "04n":
                return drizzle_icon;
            case "09d":
            case "09n":
            case "10d":
            case "10n":
                return rain_icon;
            case "13d":
            case "13n":
                return snow_icon;
            default:
                return cloud_icon;
        }
    };

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="City" />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="Search" />
                </div>
            </div>

            <div className="weather-image">
                <img src={weatherData.icon} alt="Weather" />
            </div>
            <div className="weather-temp">{weatherData.temperature}°C</div>
            <div className="weather-location">{weatherData.location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="Humidity" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{weatherData.humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="Wind Speed" className="icon" />
                    <div className="data">
                        <div className="wind-rate">{weatherData.windSpeed} km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
