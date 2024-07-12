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
    const year = dateObject.getFullYear()
    return `${day} ${month} ${year}`;
}


async function fetchWeather(city) {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city ? city : "Jaipur"}&days=3`;
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

    const forecastTwo = dayTwoForecast.date_epoch
    const forecastThree = dayThreeForecast.date_epoch
    // const datefrom = new Date(forecastOne*1000)
    const dayTwo = new Date(forecastTwo*1000).getDate();
    const dayThree = new Date(forecastThree*1000).getDate();
    const month = new Date(forecastThree*1000).toLocaleString('default', { month: 'short' });

    const weatherIconUrl = result.current.condition.icon;
    const weatherIconImg = document.querySelector(".col1-d1 img");
    const weatherIconBgImg = document.querySelector(".background img");
    // console.log(weatherIconUrl);
    // console.log(weatherIconImg);
    // if (weatherIconImg) {
        weatherIconImg.src = weatherIconUrl;
        weatherIconBgImg.src = weatherIconUrl;

    //   } else {
        // console.error("Weather icon image element not found.");
    //   }

    const weatherIconAUrl = dayTwoForecast.day.condition.icon;
    const weatherIconAImg = document.querySelector(".imgA img");
    weatherIconAImg.src = weatherIconAUrl;

    const weatherIconBUrl = dayThreeForecast.day.condition.icon;
    const weatherIconBImg = document.querySelector(".imgB img");
    weatherIconBImg.src = weatherIconBUrl;

    document.getElementById("Temp").innerHTML = `${result.current.temp_c}°C`;
    document.getElementById("Wind_speed").innerHTML = `${result.current.wind_kph}`;
    document.getElementById("Uv_index").innerHTML = `${result.current.uv}`;
    document.getElementById("Sunrise").innerHTML = `${dayOneForecast.astro.sunrise}`;
    document.getElementById("Sunset").innerHTML = `${dayOneForecast.astro.sunset}`;
    document.getElementById("weather-text").innerHTML = `${result.current.condition.text}`;
    document.getElementById("last_update").innerHTML = `${utcDate(result.current.last_updated_epoch) + " " + utcTime(result.current.last_updated_epoch)}`;
    document.getElementById("feels_like").innerHTML = `${result.current.feelslike_c}`;
    document.getElementById("humidity").innerHTML = `${result.current.humidity}`;
    document.getElementById("visibility").innerHTML = `${result.current.vis_km}`;
    document.getElementById("dayTwo").innerHTML = `${dayTwo}`;
    document.getElementById("dayThree").innerHTML = `${dayThree}`;
    document.getElementById("monthA").innerHTML = `${month}`;
    document.getElementById("monthB").innerHTML = `${month}`;
    document.getElementById("w-textA").innerHTML = `${dayTwoForecast.day.condition.text}`;
    document.getElementById("w-textB").innerHTML = `${dayThreeForecast.day.condition.text}`;
    document.getElementById("TempA").innerHTML = `${dayTwoForecast.day.maxtemp_c}`;
    document.getElementById("TempB").innerHTML = `${dayThreeForecast.day.maxtemp_c}`;
    document.getElementById("Moonrise").innerHTML = `${dayOneForecast.astro.moonrise}`;
    document.getElementById("Moonset").innerHTML = `${dayOneForecast.astro.moonset}`;
    document.getElementById("Moonphase").innerHTML = `${dayOneForecast.astro.moon_phase}`;

    const moonPhase = dayOneForecast.astro.moon_phase.toLowerCase();
    updateMoonPhase(moonPhase);


    const sunriseUnix = new Date(dayOneForecast.date + ' ' + dayOneForecast.astro.sunrise).getTime() / 1000;
    const sunsetUnix = new Date(dayOneForecast.date + ' ' + dayOneForecast.astro.sunset).getTime() / 1000;
    const currentUnix = Math.floor(new Date().getTime() / 1000);
    const uvIndex= result.current.uv;
    updateSunPosition(sunriseUnix, sunsetUnix, currentUnix, result.current.temp_c, result.current.uv);
    updateUVBar(uvIndex);

    const windSpeed = result.current.wind_kph;
    const animationSpeed = windSpeed * 0.1;

    animateCircles(animationSpeed);
    
            
} catch (error) {
	console.error(error);
}

function updateMoonPhase(phase) {
    const moon = document.getElementById('moon');
    const shade = document.getElementById('shade');
    
    // let boxShadow;
    let moonColor;
    let shadeColor;
    let shadePosition;


    switch (phase) {
        case "new moon":
            moonColor = "#000";
            shadeColor = "#000";
            shadePosition = { left: "0px"};
            // boxShadow = "inset 100px 0 0 0 #000, 0 0 5px 0 #000";
            break;
        case "waxing crescent":
            moonColor = "#fff";
            shadeColor = "#000";
            shadePosition = { left: "-20px"};
            break;
        case "first quarter":
            moonColor = "#fff";
            shadeColor = "#000";
            shadePosition = { left: "-40px"};
            break;
        case "waxing gibbous":
            moonColor = "#000";
            shadeColor = "#fff";
            shadePosition = { left: "20px"};
            break;
        case "full moon":
            moonColor = "#fff";
            shadeColor = "#fff";
            shadePosition = { left: "0px"};
            break;
        case "waning gibbous":
            moonColor = "#000";
            shadeColor = "#fff";
            shadePosition = { left: "-20px"};
            break;
        case "last quarter":
            moonColor = "#000";
            shadeColor = "#fff";
            shadePosition = { left: "-40px"};
            break;
        case "waning crescent":
            moonColor = "#fff";
            shadeColor = "#000";
            shadePosition = { left: "20px"};
            break;
        default:
            moonColor = "#fff";
            shadeColor = "#fff";
            shadePosition = { left: "0px"};
    }

    // moon.style.boxShadow = boxShadow;
    moon.style.backgroundColor = moonColor;
    shade.style.backgroundColor = shadeColor;
    shade.style.setProperty('left', shadePosition.left);
}

function updateSunPosition(sunriseUnix, sunsetUnix, currentUnix, temperature, uvIndex) {
    const sun = document.getElementById("sun");

    if (currentUnix < sunriseUnix || currentUnix > sunsetUnix) {
        sun.style.display = "none";
        return;
    }

    sun.style.display = "block";

    const totalDayTime = sunsetUnix - sunriseUnix;
    const elapsedTime = currentUnix - sunriseUnix;
    const dayProgress = elapsedTime / totalDayTime;

    const halfCircleWidth = document.querySelector(".half-circle").offsetWidth;
    const sunXPosition = halfCircleWidth * dayProgress;
    sun.style.left = `${sunXPosition}px`;

    let sunColor;
    if (temperature < 15) {
        sunColor = "lightblue";
    } else if (temperature < 25) {
        sunColor = "yellow";
    } else {
        sunColor = "red";
    }

    if (uvIndex < 3) {
        sunColor = "lightgreen";
    } else if (uvIndex < 6) {
        sunColor = "orange";
    } else {
        sunColor = "purple";
    }

    sun.style.backgroundColor = sunColor;
}
function updateUVBar(uvIndex) {
    const uvFill = document.getElementById("uvFill");
    const uvBar = document.querySelector(".uv-index-bar");
    const maxUVIndex = 10;
    const heightPercentage = (uvIndex / maxUVIndex) * 100;
    uvFill.style.height = `${heightPercentage}%`;
    console.log(uvIndex);
    let fillColor;
    if (uvIndex < 3) {
        fillColor = "lightgreen";
    } else if (uvIndex < 6) {
        fillColor = "yellow";
    } else if (uvIndex < 8) {
        fillColor = "orange";
    } else if (uvIndex < 11) {
        fillColor = "red";
    } else {
        fillColor = "purple";
    }

    uvFill.style.backgroundColor = fillColor;
    uvBar.style.boxShadow = `0px 0px 70px 5px ${fillColor}`;
}

function animateCircles(animationSpeed) {
    const motionPath = document.getElementById('motionPath');
    const movingCircle = document.getElementById('movingCircle');
    const movingCircle2 = document.getElementById('movingCircle2');
    const pathLength = motionPath.getTotalLength();
    let direction = 1; 
    let distance = 0;

    function animateCircle(timestamp) {
        requestAnimationFrame(animateCircle);

        distance += direction * animationSpeed; 

        if (distance < 0 || distance > pathLength) {
            direction *= -1; 
        }

        let point = motionPath.getPointAtLength(distance);

        movingCircle.setAttribute('cx', point.x);
        movingCircle2.setAttribute('cx', point.x);
        movingCircle.setAttribute('cy', point.y);
        movingCircle2.setAttribute('cy', point.y);
    }

    animateCircle(); 
}

}
fetchWeather();


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

        