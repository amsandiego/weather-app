import { renderMain, renderError, renderExtra, loadingAnimation, renderStoredItems } from './dom';
import { storedLocations, updateLastSearched } from './storage';

const API_KEY = '63aaafd07154a0f5cce2bad4e4d8370c';

const getStoredWeather = (units) => {
    storedLocations.forEach(async (location, index) => {
        try {
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&units=${units}&appid=${API_KEY}`
            );
            if (!weatherResponse.ok) throw new Error(weatherResponse.statusText);

            const weather = await weatherResponse.json();

            renderStoredItems(weather, index);
        } catch (err) {
            renderError('Sorry, something went wrong!');
        }
    });
};

const getWeather = async (input) => {
    try {
        loadingAnimation();
        const unitCheckbox = document.querySelector('.card-units-checkbox');
        const units = unitCheckbox.checked ? 'imperial' : 'metric';

        const inputResponse = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${API_KEY}`
        );
        if (!inputResponse.ok) throw new Error(inputResponse.statusText);

        const location = await inputResponse.json();
        if (!location.length) throw new Error('NOT FOUND');

        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/3.0/weather?lat=${location[0].lat}&lon=${location[0].lon}&units=${units}&appid=${API_KEY}`
        );
        if (!weatherResponse.ok) throw new Error(weatherResponse.statusText);

        const extraResponse = await fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${location[0].lat}&lon=${location[0].lon}&exclude=current,minutely,alerts&units=${units}&appid=${API_KEY}`
        );
        if (!extraResponse.ok) throw new Error(extraResponse.statusText);

        const weather = await weatherResponse.json();
        const extra = await extraResponse.json();

        renderMain(weather);
        renderExtra(extra);
        updateLastSearched(weather.name);
        loadingAnimation();
        getStoredWeather(units);
    } catch (err) {
        loadingAnimation();
        if (err.message !== 'NOT FOUND') renderError('Sorry, something went wrong!');
        if (err.message === 'NOT FOUND') renderError(`Sorry, we couldn't find ${input}`);
    }
};

export default getWeather;
