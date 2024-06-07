'use client'
import React from 'react';
import styles from './WeatherCard.module.css';
import { FaLongArrowAltUp, FaLongArrowAltDown, FaArrowsAltH } from "react-icons/fa";
import { TiWeatherSunny, TiWeatherCloudy, TiWeatherShower } from "react-icons/ti";

interface WeatherCardProps {
    city: string;
    country: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    description: string;
    icon: string;
    sunrise: Date;
    sunset: Date;
    maxTemp: number;
    minTemp: number;
    forecast?: Array<{ date: Date; temp: number; icon: string }>;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, country, temperature, feelsLike, humidity, description, icon, sunrise, sunset, maxTemp, minTemp, forecast }) => {
    const getDayName = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    const getTemperatureChangeIcon = (currentTemp: number, forecastTemp: number) => {
        if (forecastTemp > currentTemp) {
            return <FaLongArrowAltUp />;
        } else if (forecastTemp < currentTemp) {
            return <FaLongArrowAltDown />;
        } else {
            return <FaArrowsAltH />
        }
    };

    return (
        <div className={styles.weatherGlobal}>
            <div className={styles.weatherCard}>
                <div className={styles.leftContent}>
                    <h2>{city}, {country}</h2>
                    <h3>{temperature}°C</h3> <h4>{minTemp}°C</h4>
                    <p>Sunrise: {sunrise.toLocaleTimeString()}</p>
                    <p>Sunset: {sunset.toLocaleTimeString()}</p>
                </div>
                <div className={styles.rightContent}>
                    <img src={icon} alt="weather icon" />
                    <p>{description}</p>
                </div>

                {/* */}
                {/* <p>Max:  | Min: </p> */}


            </div>
            <div className={styles.feelsLikeCard}>
                <p>Sensação Térmica: {feelsLike}°C</p>
            </div>

            <div className={styles.humidityCard}>
                <p>Humidade: {humidity}%</p>
            </div>

            <div className={styles.forecastContainer}>
                {forecast && (
                    <div className={styles.forecast}>
                        <h4>Forecast:</h4>
                        {forecast.map((day, index) => (
                            <div key={index} className={styles.forecast}>
                                <p>{getDayName(day.date)}</p>
                                <img src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`} alt="weather icon" />
                                <p>{day.temp}°C {getTemperatureChangeIcon(temperature, day.temp)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WeatherCard;