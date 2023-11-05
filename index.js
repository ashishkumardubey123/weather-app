const usertab = document.querySelector("[data-userWeather]");
const searchtab = document.querySelector("[data-searhWeather]");
const userconatiner = document.querySelector(".Weather-Container");
const GrantAccessContainer = document.querySelector(".grant-location-Conatiner");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-conatiner");
const userInfoContainer = document.querySelector(".user-info-container");
let oldTab= usertab;
const API_KEY= "c7c1719d336633fb9f37cd4fa542c93b";
oldTab.classList.add("current-tab")
getfromeSessionStorage()

function swichtab(newTab){

    if (newTab!= oldTab) {
        
     oldTab.classList.remove("current-tab")
     oldTab=newTab;
     oldTab.classList.add("current-tab")
        if (!searchForm.classList.contains("active ")) {
            userInfoContainer.classList.remove("active")
            GrantAccessContainer.classList.remove("active")
            searchForm.classList.add("active")
        }


        else{

       searchForm.classList.remove("active")
       userInfoContainer.classList.remove("active")
       getfromeSessionStorage();


        }
    }

}
usertab.addEventListener("click", ()=>{
// pass clicked tab as input parameters
     swichtab(usertab)

})

searchtab.addEventListener("click", ()=>{
    // pass clicked tab as input parameters
         swichtab(searchtab)
    
    })
    
    function getfromeSessionStorage(){
        const loacalCoordinates = sessionStorage.getItem("usre-coordinates")
        if (!loacalCoordinates) {
            GrantAccessContainer.classList.add("active");
            
        }
        else{

            const coordinates= JSON.parse(loacalCoordinates)
            fatchUserWeatherInfo(coordinates)
        }
    }
  async function fatchUserWeatherInfo(coordinates){

    const {lat, lon}= coordinates
    GrantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");
    //  API CALL
    try {
        
        const response=  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`); 
        const data= await response.json();
        loadingScreen.classList.remove("active")
        userInfoContainer.classList.add("active")
        randerWeatherInfo(data)

    } catch (err) {
        loadingScreen.classList.remove("active")
     alert("dtata nota fatch by APi")

        
    }
    
}

function randerWeatherInfo(weatherInafo){
    const cityName= document.querySelector("[data-cityName]");
    const cunrtyIacone= document.querySelector("[data-counrtyIcon]")
    const desc = document.querySelector ("[data-weatherDesc]")
    const weatherIcon= document.querySelector("[data-WeatherIcon]")
    const temp= document.querySelector("[data-Temp]")
    const windSpeed =document.querySelector("#data-windsped")
    const humidity = document.querySelector("[data-humidity]")
    const cloudiness= document.querySelector("[data-cloud]")

    cityName.innerText= weatherInafo?.name;
    cunrtyIacone.src = `https://flagcdn.com/144x108/${weatherInafo?.sys?.country.toLowerCase()}.png`;
    desc.innerText= weatherInafo?.weather?.[0]?.description; 
    weatherIcon.src =`http://openweathermap.org/img/w/${weatherInafo?.weather?.[0]?.icon}.png`;


    temp.innerText=`${weatherInafo?.main?.temp} °C`;
    windSpeed.innerText= `${weatherInafo?.wind?.speed}M/S`;
    humidity.innerText= `${weatherInafo?.main?.humidity} % `;
    cloudiness.innerText=`${weatherInafo?.clouds?.all} %`;

}

function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    }

    else{
alert("no geolocation support available ")

    }
}
function showPosition(position ){

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("usre-coordinates" , JSON.stringify(userCoordinates));
    fatchUserWeatherInfo(userCoordinates);
}

const grantAccess= document.querySelector("[data-grantAccess]")
grantAccess.addEventListener("click", getLocation);

let searchInaput=   document.querySelector("[data-SearchInput]");
searchForm,addEventListener("submit" ,(e)=>{

    e.preventDefault();
    let cityName= searchInaput.value
    if (cityName === "") return
    else
    fetchSearchWeatherInfo(cityName);

})

async function fetchSearchWeatherInfo(city){

loadingScreen.classList.add("active")
userInfoContainer.classList.remove("active")
GrantAccessContainer.classList.remove("active")

try {

    const response=  await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    const data= await response.json()
    
loadingScreen.classList.remove("active")
userInfoContainer.classList.add("active")
randerWeatherInfo(data);
    
} catch (error) {
    
}

}
