import React, { useState } from 'react'
import './weather.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'

const Weather = () => {
    let api_key = "d131ac2bc46387a3ba84ee6a73a86c6e"
    const [wicon, setwicon] = useState(cloud_icon)

    const search = async () => {
        const element = document.getElementsByClassName('cityInput')
        if (element[0].value ===""){
          return 0
        }

        

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}`
  try {
    let respose = await fetch(url)
    let data = await respose.json()

    if (data.cod && data.cod === "404") {
      //location[0].innerHTML= 'location not found'
      throw new Error("City not found");
    }

      
    const humidity = document.getElementsByClassName('humidity-percentage')
    const wind = document.getElementsByClassName('wind-rain')
    const temperature = document.getElementsByClassName('weather-temp')
    const location = document.getElementsByClassName('weather-location')

      const temperatureCelsius = data.main.temp - 273.15;

      humidity[0].innerHTML=data.main.humidity+"%"
      temperature[0].innerHTML=temperatureCelsius.toFixed(2) +"C"
      wind[0].innerHTML=data.wind.speed+"km/hr"
      
      location[0].innerHTML=data.name

      

    
  } catch (error) {
    
    console.error("Error fetching weather data:", error.message);
    const location = document.getElementsByClassName('weather-location');
    const temperature = document.getElementsByClassName('weather-temp');
    temperature[0].innerHTML = 0
    location[0].innerHTML = 'Location not found';
  }
    
      
    
}
    
  return (
    <div className='container'>
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='Enter city'/>
        <div className='search-icon' onClick={()=>search()}>
        <img src={search_icon} alt=""/>
      </div>
      </div>

        <div className='weather-image'>
            <img src={cloud_icon} alt=''/>
        </div>
        <div className='weather-temp'>0</div>
        <div className='weather-location'>Location</div>
        <div className='data-container'>
            <div className='element'>
                <img src={humidity_icon} alt='' className='icon'/>
                <div className="data">
                    <div className="humidity-percentage"> %</div>
                    <div className='text'> Humidity</div>
                </div>

            </div>

            <div className='element'>
                <img src={wind_icon} alt='' className='icon'/>
                <div className="data">
                    <div className="wind-rain"> km/hr</div>
                    <div className='text'>wind speed</div>
                </div>

            </div>
        </div>
</div>
  )
}

export default Weather
