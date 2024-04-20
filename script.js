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

async function fetchWeather(city) {
  const url =
    `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
  
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "06d07b6887msha4edc30b010d279p1956c8jsnc3da6dbf49de",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    document.getElementById("Temp").innerHTML = `${result.temp}°C`;
    //   } catch (error) {
    // console.error(error);
    //   }
    document.getElementById("Cloud_pct").innerHTML = result.cloud_pct;
    document.getElementById("Feels_like").innerHTML = result.feels_like;
    document.getElementById("Humidity").innerHTML = result.humidity;
    document.getElementById("Min_temp").innerHTML = result.min_temp;
    document.getElementById("Max_temp").innerHTML = result.max_temp;
    document.getElementById("Wind_speed").innerHTML = result.wind_speed;
    document.getElementById("Wind_degrees").innerHTML = result.wind_degrees;
    document.getElementById("Sunrise").innerHTML = utcTime(result.sunrise);
    document.getElementById("Sunset").innerHTML = utcTime(result.sunset);
    
  }catch (error) {
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
