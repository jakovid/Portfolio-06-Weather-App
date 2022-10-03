const img = document.getElementById('weatherImg');
let weatherImgType = 'rain';
let temperature = '';
let percipitation = '';
let humidity = '';
let wind = '';
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
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${giphyID}&s=${weatherImgType}`, { mode: 'cors' })
    const weatherImgData = await response.json();
    img.src = weatherImgData.data.images.original.url;
}

async function getLongitudeLatitude() {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=${weatherID}`);
    const locationWeatherData = await response.json();
    latitude = locationWeatherData[0].lat;
    longitude = locationWeatherData[0].lon;
    console.log(longitude);
    console.log(latitude);
}

async function getWeatherInformation() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherID}`);
    const weatherData = await response.json();
    console.log(weatherData);
}

getWeatherImg();
populateLocationInformation();
getLongitudeLatitude();
getWeatherInformation();