const KEY = "ac4c7bf2282d54989451de45bea3942d";
const resultEl = document.querySelector("#result");
const searchBtnEl = document.querySelector("#search-btn");
const cityInputEl = document.querySelector("#city-input");

const fetchWeather = () => {
  let inputValue = cityInputEl.value;
  console.log(inputValue);
  // if input fiels is empty
  if (inputValue.length == 0) {
    resultEl.innerHTML = `
    <h3 class="error-msg">Please Enter a city name</h3>`;
  } else {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${KEY}&units=metric`;

    fetch(url)
      .then((respponse) => respponse.json())
      .then((data) => {
        resultEl.innerHTML = `
        <h2 class="city-name">${data.name}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="weather-desc">${data.weather[0].description}</h4>
        <img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png" />
        <h1 class="temp">${data.main.temp} &#176;</h1>
        
       <div class="min-max-temp-container">
           <div>
             <h4 class=min-max-title>min</h4>
             <h4 class="min-max-temp">${data.main.temp_min}</h4>
           </div>
           
           <div>
           <h4 class=min-max-title>max</h4>
           <h4 class="min-max-temp">${data.main.temp_max}</h4>
           </div>
         </div>
           
           </div>
       </div>
        `;
      })

      // if city is not found
      .catch(() => {
        resultEl.innerHTML = `
        <h3 class="error-msg">City not found</h3>`;
      });
  }
};

window.addEventListener("load", fetchWeather);
searchBtnEl.addEventListener("click", fetchWeather);
cityInputEl.addEventListener("keyup", (event) => {
  event.preventDefault();
  // fetch data if key is enter
  if (event.key == "Enter") {
    fetchWeather();
  }
});
