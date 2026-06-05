const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3000;

// --- PUT YOUR API KEY HERE ---
const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; 
// Replace above with your actual key from openweathermap.org
// --------------------------------

const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

app.use(cors());
app.use(express.json());

// Route: /weather/cityname
app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    
    try {
        const response = await fetch(`${API_URL}${city}&appid=${API_KEY}`);
        const data = await response.json();

        if (data.cod == 404) {
            res.json({ error: "City not found" });
        } else {
            res.json({
                temp: Math.round(data.main.temp),
                city: data.name,
                humidity: data.main.humidity,
                wind: data.wind.speed,
                condition: data.weather[0].main,
                icon: data.weather[0].icon
            });
        }
    } catch (error) {
        res.json({ error: "Server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});