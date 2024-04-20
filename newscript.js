document.addEventListener("DOMContentLoaded", () => { 
const searchBox = document.querySelector(".searchcity input");
const searchBtn = document.querySelector(".searchcity button");

function utcTime(unixtime) {
    const milliseconds = unixtime * 1000;
    const dateObject = new Date(milliseconds);
    let hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
}

function utcDate(unixtime) {
    const milliseconds = unixtime * 1000;
    const dateObject = new Date(milliseconds);
    const day = dateObject.getDate();
    const month = dateObject.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
}

async function fetchWeather(city) {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '06d07b6887msha4edc30b010d279p1956c8jsnc3da6dbf49de',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
	console.log(result.current);
    const dayOneForecast = result.forecast.forecastday[0];
    const dayTwoForecast = result.forecast.forecastday[1];
    const dayThreeForecast = result.forecast.forecastday[2];
    // const dayOneSunrise = dayOneForecast.astro.sunrise;
    // const dayOneSunset = dayOneForecast.astro.sunset;
	console.log(dayOneForecast);
	console.log(dayTwoForecast);
	console.log(dayThreeForecast);

    const weatherIconUrl = result.current.condition.icon;
    const weatherIconImg = document.querySelector(".col1-d1 img");
    // console.log(weatherIconUrl);
    // console.log(weatherIconImg);
    // if (weatherIconImg) {
        weatherIconImg.src = weatherIconUrl;
    //   } else {
        // console.error("Weather icon image element not found.");
    //   }

    document.getElementById("Temp").innerHTML = `${result.current.temp_c}°C`;
    document.getElementById("Wind_speed").innerHTML = `${result.current.wind_kph}`;
    document.getElementById("Uv_index").innerHTML = `${result.current.uv}`;
    document.getElementById("Sunrise").innerHTML = `${dayOneForecast.astro.sunrise}`;
    document.getElementById("Sunset").innerHTML = `${dayOneForecast.astro.sunset}`;
    document.getElementById("last_update").innerHTML = `${utcDate(result.current.last_updated_epoch) + " " + utcTime(result.current.last_updated_epoch)}`;

} catch (error) {
	console.error(error);
}

}

searchBtn.addEventListener("click", ()=>{
    fetchWeather(searchBox.value);
    document.querySelector(".city").innerHTML = searchBox.value;
        
})

function formatDateTime(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
  
  
    const monthName = months[monthIndex];
    
    return `${day} ${monthName} ${year} ${formattedHours}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
}
  
function updateDateTime() {
    const currentDate = new Date();
    const formattedDateTime = formatDateTime(currentDate);
  
    document.getElementById("currentDateTime").textContent = formattedDateTime;
}
  
updateDateTime();
setInterval(updateDateTime, 1000);

});