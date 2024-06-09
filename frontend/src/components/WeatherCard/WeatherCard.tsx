'use client'
import React from 'react';
import styles from './WeatherCard.module.css';
import { FaLongArrowAltUp, FaLongArrowAltDown, FaArrowsAltH } from "react-icons/fa";
import { TiWeatherSunny, TiWeatherCloudy, TiWeatherShower } from "react-icons/ti";
import { FaDroplet } from "react-icons/fa6";
import { FaThermometerThreeQuarters } from "react-icons/fa";

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
            <div className={styles.topContent}>
                <div className={styles.weatherCard}>
                    <div className={styles.WeatherCardLeftContent}>
                        <h2>{city}, {country}</h2>
                        <div className={styles.temperatureBox}>
                            <h2>{Math.round(temperature)}°C</h2>
                            <h3>{Math.round(minTemp)}°C</h3>
                        </div>
                        <div className={styles.sunriseBox}>
                            <div className={styles.sunriseInnerBox}>
                                <p>Sunrise</p>
                                <span>{sunrise.toLocaleTimeString()}</span>
                            </div>
                            <div className={styles.sunriseInnerBox}>
                                <p>Sunset</p>
                                <span>{sunset.toLocaleTimeString()}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.WeatherCardRightContent}>
                        <img className={styles.weatherIcon} src={icon} alt="weather icon" />
                        <p>{description}</p>
                    </div>

                    {/* */}
                    {/* <p>Max:  | Min: </p> */}


                </div>
                <div className={styles.feelsLikeCard}>
                    <p>Feels Like</p>
                    <p>{Math.round(feelsLike)}°C</p>
                    <span className={styles.spanText}>
                        <p><FaThermometerThreeQuarters /></p>
                        the temperature
                        you actually feel
                    </span>
                </div>

                <div className={styles.humidityCard}>
                    <p>Humidity</p>
                    <p>{humidity}%</p>
                    <span className={styles.spanText}>
                        <p><FaDroplet /></p>
                        amount of water
                        vapor in the air
                    </span>
                </div>
            </div>
            <div className={styles.bottomContent}>
                {forecast && (
                    <div className={styles.forecastContainer}>
                        {forecast.map((day, index) => (
                            <div key={index} className={styles.forecastCard}>
                                <p>{getDayName(day.date)}</p>
                                <img src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`} alt="weather icon" />
                                <span className={styles.forecastTemp}>{Math.round(day.temp)} °C {getTemperatureChangeIcon(temperature, day.temp)}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}

export default WeatherCard;