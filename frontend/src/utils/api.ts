import axios from 'axios';

const API_KEY = 'b26c11ecd00c64553e1ee9031c6e4e48'; // Substitua com a sua chave de API
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const fetchWeather = async (city: string) => {
    const response = await axios.get(`${BASE_URL}weather`, {
        params: {
            q: city,
            units: 'metric',
            appid: API_KEY,
        },
    });
    // const weatherData = response.data;
    // const sunrise = new Date(weatherData.sys.sunrise * 1000);
    // const sunset = new Date(weatherData.sys.sunset * 1000);
    // const maxTemp = weatherData.main.temp_max;
    // const minTemp = weatherData.main.temp_min;

    // return { ...weatherData, sunrise, sunset, maxTemp, minTemp };
    const data = response.data;

    return {
        name: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        sunrise: new Date(data.sys.sunrise * 1000),
        sunset: new Date(data.sys.sunset * 1000),
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
    };
};

export const fetchForecast = async (city: string) => {
    const response = await axios.get(`${BASE_URL}forecast`, {
        params: {
            q: city,
            units: 'metric',
            appid: API_KEY,
        },
    });

    // Filtra previsões para pegar apenas as previsões das 12:00 de cada dia
    const forecastData = response.data.list.filter((item: any) => {
        const date = new Date(item.dt * 1000);
        return date.getHours() === 12; // Pega apenas a previsão das 12:00
    }).map((item: any) => ({
        date: new Date(item.dt * 1000),
        temp: item.main.temp,
        icon: item.weather[0].icon,
    }));

    console.log('Processed forecast data:', forecastData);
    return forecastData;
};
