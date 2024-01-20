const apiKey = "c4060b4dd12716fa10d59622c50ead1e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const fivedays = document.querySelector(".forecast-button");
let apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${apiKey}`; 
const oneday = document.querySelector(".container");
const fiveday = document.querySelector(".forecast-container")
const container = document.querySelector(".container")
const backButton = document.querySelector(".back-button")

const sB = document.getElementById("city");
const btn = document.querySelector(".gg-search");
const wI = document.querySelector(".Weather-icon");
async function fetchJsonData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch JSON: ${response.status}`);
  }
  return response.json();
}


const snowb = 'radial-gradient(circle, rgba(168,255,254,1) 0%, rgba(119,175,251,1) 100%)';
const mistb = 'radial-gradient(circle, rgba(235,255,168,1) 0%, rgba(119,208,251,1) 100%)';
const drizzleb = 'radial-gradient(circle, rgba(246,249,176,1) 0%, rgba(6,138,201,1) 100%)';
const cloudsb = 'radial-gradient(circle, rgba(230,232,193,1) 0%, rgba(4,194,255,1) 100%)';
const clearb = 'radial-gradient(circle, rgba(234,241,105,1) 0%, rgba(192,223,233,1) 100%)';
const rainb = 'radial-gradient(circle, rgba(105,241,237,1) 0%, rgba(64,157,247,1) 100%)';











import { names } from './array.js';

let sortedNames = names.sort();


const suggestionsList = document.querySelector('.suggestions-list');

sB.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  removeElements();

  for (let i of sortedNames) {
    if (i.toLowerCase().startsWith(searchTerm) && searchTerm !== "") {
      let listItem = document.createElement("li");
      listItem.classList.add("list-items");
      listItem.style.cursor = "pointer";
      listItem.innerHTML = "<b>" + i.substr(0, searchTerm.length) + "</b>" + i.substr(searchTerm.length);

      
      listItem.addEventListener("click", function() {
        console.log("Clicked: " + i);
        displayNames(i);
        checkWeather(i);  
      });
     
      suggestionsList.appendChild(listItem);
    }
  }
  listItem.style.display = "hidden";
  
});

function displayNames(value) {
  console.log("Displaying: " + value);
  sB.value = value;
  removeElements();
}

function removeElements() {
  while (suggestionsList.firstChild) {
    suggestionsList.removeChild(suggestionsList.firstChild);
  }
}










async function checkWeather(city) {
  try {

    



    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    if (!fivedays.classList.contains("hidden")){
      fivedays.style.display = "inline-block";
    }
    container.style.height = container.clientHeight === 100 ? '462px' : '640px';
    
    console.log(data); 
    if (data.message === "Nothing to geocode") {
      fivedays.style.display = "none";
    }
    


    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    const weatherIcons = {
      'Clear': 'clear.png',
      'Clouds': 'clouds.png',
      'Drizzle': 'drizzle.png',
      'Mist': 'mist.png',
      'Snow': 'snow.png',
      'Rain': 'rain.png',
    };

    const weatherMain = data.weather[0].main;
    wI.src = `imgs/${weatherIcons[weatherMain] || 'default.png'}`;
  } catch (error) {
    console.error('Error:', error);

  }
}

btn.addEventListener("click", () => {
  checkWeather(sB.value);
});

sB.addEventListener(
  'keyup', (e) => {
    if (e.keyCode === 13) {
      checkWeather(sB.value).then( () =>{
        fivedays.style.display = "inline-block";
      });
      suggestionsList.style.display = "none";
    }
  }
);



btn.addEventListener("click", () => {
  
 
});
sB.addEventListener(
  'keyup', (e) => {
    if (e.keyCode === 13) {
      fivedays.classList.toggle("hidden");
  if (!fivedays.classList.contains("hidden")){
    fivedays.style.display = "inline-block";
  }
    }
  }
)

fivedays.addEventListener("click", async () => {
  

  const promises = [];

  async function checkWeather2(city) {
    try {
      const response = await fetch(apiUrl2 + `&q=${city}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data2 = await response.json();
      const noonData2 = data2.list.filter(entry => entry.dt_txt.includes(' 12:00:00'));
      container.style.height = container.clientHeight === 100 ? '640px' : '0px';
      
      oneday.style.display = "none";

  fiveday.style.display = "inline";

      console.log(`Number of day items: ${noonData2.length}`);

      promises.push(
        ...noonData2.map(async (entry, index) => {
          const dayItem = document.getElementById(`day-item${index}`);

          console.log(`Processing day ${index + 1} - Data:`, entry);

          dayItem.querySelector('.date').textContent = entry.dt_txt.split(' ')[0];
          dayItem.querySelector('.temp').textContent = `${entry.main.temp} °C`;
          dayItem.querySelector('.humidity2').textContent = `${entry.main.humidity}%`;

          const weatherIconElement = dayItem.querySelector('.Weather-icon');
          const weatherMain = entry.weather[0].main;
          const weatherIcons = {
            'Clear': 'clear.png',
            'Clouds': 'clouds.png',
            'Drizzle': 'drizzle.png',
            'Mist': 'mist.png',
            'Snow': 'snow.png',
            'Rain': 'rain.png',
          };

          weatherIconElement.src = `imgs/${weatherIcons[weatherMain] || 'default.png'}`;

          dayItem.querySelector('.wind2').textContent = `${entry.wind.speed} km/h`;

          // Use a switch statement to set the background color based on weatherMain
          const theDay = document.querySelector(`#day-item${index}`);
          switch (weatherMain) {
            case 'Clear':
              theDay.style.background = clearb;
              break;
            case 'Clouds':
              theDay.style.background = cloudsb;
              break;
            case 'Drizzle':
              theDay.style.background = drizzleb;
              break;
            case 'Mist':
              theDay.style.background = mistb;
              break;
            case 'Snow':
              theDay.style.background = snowb;
              break;
            case 'Rain':
              theDay.style.background = rainb;
              break;
            default:
              // Set a default background color if weatherMain is not recognized
              theDay.style.background = 'transparent';
              break;
          }
        })
      );
    } catch (error) {
      console.error('Error:', error);
    }
  }

  await checkWeather2(sB.value);
  await Promise.all(promises);
});





const locationBtn = document.querySelector(".locatine");


let watchId;

locationBtn.addEventListener("click", function () {
  if (navigator.geolocation) {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
    }

    watchId = navigator.geolocation.watchPosition(
      async function (position) {
        try {
          const timestamp = new Date().getTime();
          const reverseGeocodingUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${apiKey}&timestamp=${timestamp}`;
          const response = await fetch(reverseGeocodingUrl);
          const data = await response.json();

          const cityName = data[0].name.split(",")[0]; 

          sB.value = cityName;

          checkWeather(cityName);
        } catch (error) {
          console.error("Error getting location:", error.message);
        }
      },
      function (error) {
        console.error("Error getting location:", error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
  
});



window.addEventListener("unload", function () {
    if (navigator.geolocation && watchId) {
        navigator.geolocation.clearWatch(watchId);
    }
});

backButton.addEventListener("click", () => {
  oneday.style.display = "block";
  container.style.height = container.clientHeight === 100 ? '0xp' : '640px';
  fiveday.style.display = "none";
})