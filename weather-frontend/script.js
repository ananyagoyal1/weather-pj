const backendUrl = "https://weather-pj.onrender.com";


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (!city) return;

    try {
        const response = await fetch(backendUrl + city);
        const data = await response.json();

        if (data.error) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            // Update UI with data from backend
            document.querySelector(".city").innerHTML = data.city;
            document.querySelector(".temp").innerHTML = data.temp + "°c";
            document.querySelector(".humidity").innerHTML = data.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind + " km/h";

            // Dynamic weather icon
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.log("Error:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        checkWeather(searchBox.value);
    }
});
