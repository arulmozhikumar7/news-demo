import axios from "axios"
import { useEffect, useState } from "react"

type currentWeather = {
    coord : [
        lon: string,
        lat: string
    ];
    weather: [
        {
            id: string,
            main: string,
            description: string,
            icon: string
        }
    ];
    name: string;
    sys: {
        type: string,
        id: string,
        country: string,
        sunrise: string,
        sunset: string
    };
    main: {
        temp: string,
        feels_like: string,
        temp_min: string,
        temp_max: string,
        pressure: string,
        humidity: string,
        sea_level: string,
        grnd_level: string
    }


}
const Weather = () => { 
    const [currentWeather,setCurrentWeather] = useState<currentWeather>();
    const fetchWeather = async ()=>{
       try{
        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=chennai&units=metric&appid=b34bf1d992bf462f6b91850fd191f33e");
        setCurrentWeather(response.data);
        console.log(response.data);
       }catch(error){
        console.log(error)
       }
    }
    useEffect(()=>{
        fetchWeather();
    },[]);
  return (
    <div className="flex border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:scale-105 transition duration-500 w-1/3 m-3   ">
       <div className="flex flex-col">
       <p className="m-2">
            <span className="font-bold mr-1">
                Location : 
            </span>
             {currentWeather?.name}
        </p>
        <p className="m-2"> 
            <span className="font-bold mr-1">
                Current Temp :
            </span>
             {
                currentWeather?.main.temp
            }°C
        </p>
        <p className="m-2"> 
            <span className="font-bold mr-1">
                 Feels like:
            </span>
             {
                currentWeather?.main.feels_like
            }°C
        </p>
       
        <div className="m-2 flex "> 
            <span className="font-bold mr-1">
                Weather :
            </span>
             <span className="mr-1">
             {
                currentWeather?.weather[0].main
            }   
             </span>

        </div>
       
       </div>
       <div className="flex justify-center px-5 items-center">

       <img src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@2x.png`} alt=""  />
       </div>
    </div>
  )
}

export default Weather