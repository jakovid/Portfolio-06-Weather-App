const img = document.getElementById('weatherImg');
let weatherImgType = 'rain';

async function getWeatherImg() {
    img.src = '#';
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=kvwilimQvZM1Dlh0EkhG1ZiEEEn9zkii&s=${weatherImgType}`, { mode: 'cors' })
    const weatherImgData = await response.json();
    img.src = weatherImgData.data.images.original.url;
    console.log('click');
}
getWeatherImg();