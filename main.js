const img = document.getElementById('weatherImg');
let temperature = '';
let precipitation = 'Percipitation: idk how to calc lol';
let humidity = '';
let wind = '';
let city = 'Cincinnati';
let state = 'OH';
let country = 'US';
let locationDayTime = 'Sunday, 4:30PM';
let locationWeatherType = 'Mostly sunny';
let longitude = -84.5124602;
let latitude = 39.1014537;
let unitType = 'metric';

function addEventListeners() {
    let celciusButton = document.getElementById('celsius');
    let fahrenheitButton = document.getElementById('fahrenheit');

    celciusButton.addEventListener('click', e => {
        changeUnitType('metric');
        console.log('click');
        displayWeatherInformation();
    });
    fahrenheitButton.addEventListener('click', e => {
        changeUnitType('imperial');
        displayWeatherInformation();
    })
}

function changeUnitType(selectedUnitType) {
    unitType = selectedUnitType;
}

async function displayWeatherInformation() {    
    await populateLocationInformation();
    getWeatherImg();
}

async function populateLocationInformation() {

    await getWeatherInformation();

    let temperatureDisplay = document.getElementById('degreeNumber');
    let precipitationDisplay = document.getElementById('precipitation');
    let humidityDisplay = document.getElementById('humidity');
    let windDisplay = document.getElementById('wind');
    let locationNameBox = document.getElementById('locationName');
    let locationDayTimeBox = document.getElementById('locationDayTime');
    let locationWeatherTypeBox = document.getElementById('locationWeatherType');

    temperatureDisplay.innerHTML = temperature;
    precipitationDisplay.innerHTML = precipitation;
    humidityDisplay.innerHTML = humidity;
    windDisplay.innerHTML = wind;
    locationNameBox.innerHTML = city + ', ' + state + ', ' + country;
    locationDayTimeBox.innerHTML = locationDayTime;
    locationWeatherTypeBox.innerHTML = locationWeatherType;
    console.log(temperatureDisplay);
    console.log('hahhhh');
    
}

async function getWeatherImg() {
    img.src = '#';
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=kvwilimQvZM1Dlh0EkhG1ZiEEEn9zkii&s=${locationWeatherType}`, { mode: 'cors' })
    const weatherImgData = await response.json();
    img.src = weatherImgData.data.images.original.url;
}

async function getLongitudeLatitude() {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=5dd670ae6c88bc100c0dc5e21791aef5`);
    const locationWeatherData = await response.json();
    latitude = locationWeatherData[0].lat;
    longitude = locationWeatherData[0].lon;
    console.log(longitude);
    console.log(latitude);
}

async function getWeatherInformation() {
    await getLongitudeLatitude();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5dd670ae6c88bc100c0dc5e21791aef5&units=${unitType}`);
    const weatherData = await response.json();
    console.log(weatherData);
    temperature = weatherData.main.temp;
    humidity = 'Humidity: ' + weatherData.main.humidity+'%';
    wind = 'Wind: ' + weatherData.wind.speed +`${unitType == 'metric' ? 'km/h' : 'mph'}`;
    locationWeatherType = weatherData.weather[0].main;
}



addEventListeners();
displayWeatherInformation();