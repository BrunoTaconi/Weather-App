'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import WeatherCard from '../WeatherCard/WeatherCard';
import { fetchWeather, fetchForecast } from '@/utils/api';
import styles from './Home.module.css';
import { FaSearch } from "react-icons/fa";

const HomePage: React.FC = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<any>(null);
    const [forecast, setForecast] = useState<any>(null);

    const handleSearch = async () => {
        try {
            const data = await fetchWeather(city);
            console.log('Weather data:', data);
            setWeather(data);

            const forecastData = await fetchForecast(city);
            console.log('Forecast data:', forecastData);
            setForecast(forecastData.slice(0, 5)); // Pega os primeiros 5 dias
        } catch (error) {
            console.error('Error searching weather: ', error);
        }
    };

    return (
        <div className={styles.globalContainer}>
            <Head>
                <title>Weather App</title>
                <meta name="description" content="Weather application using Next.js and TypeScript" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.content}>
                <h1 className={styles.title}>Weather App</h1>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='Enter city name'
                        className={styles.searchInput}
                    />
                    <FaSearch className={styles.searchIcon}/>
                    <button className={styles.searchButton} onClick={handleSearch}>Search</button>
                </div>

                {weather && (
                    <WeatherCard
                        city={weather.name}
                        country={weather.country}
                        temperature={weather.temp}
                        feelsLike={weather.feels_like}
                        humidity={weather.humidity}
                        description={weather.description}
                        icon={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                        sunrise={weather.sunrise}
                        sunset={weather.sunset}
                        maxTemp={weather.temp_max}
                        minTemp={weather.temp_min}
                        forecast={forecast}
                    />
                )}
            </main>
        </div>
    );
};

export default HomePage;

