const img = document.getElementById('weatherImg');
let weatherImgType = 'rain';
let city = 'Cincinnati';
let state = 'OH';
let country = 'US';
let locationDayTime = 'Sunday, 4:30PM';
let locationWeatherType = 'Mostly sunny';
let longitude = '';
let latitude = '';

function populateLocationInformation() {
    let locationNameBox = document.getElementById('locationName');
    let locationDayTimeBox = document.getElementById('locationDayTime');
    let locationWeatherTypeBox = document.getElementById('locationWeatherType');

    locationNameBox.innerHTML = city + ', ' + state + ', ' + country;
    locationDayTimeBox.innerHTML = locationDayTime;
    locationWeatherTypeBox.innerHTML = locationWeatherType;
    
}

async function getWeatherImg() {
    img.src = '#';
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=kvwilimQvZM1Dlh0EkhG1ZiEEEn9zkii&s=${weatherImgType}`, { mode: 'cors' })
    const weatherImgData = await response.json();
    img.src = weatherImgData.data.images.original.url;
}

async function getLongitudeLatitude() {
    city = document.getElementById('cityLocationInput').value;
    state = document.getElementById('stateLocationInput').value;
    country = document.getElementById('countryLocationInput').value;

    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=5dd670ae6c88bc100c0dc5e21791aef5`);
    const locationWeatherData = await response.json();
    latitude = locationWeatherData[0].lat;
    longitude = locationWeatherData[0].lon;
}

getWeatherImg();
populateLocationInformation();