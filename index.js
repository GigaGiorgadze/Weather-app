const form = document.querySelector('form')
const forecast = document.querySelector('#forecast')
const cityName = document.querySelector('#cityName')
const temp = document.querySelector('#temp')
const feelingTemp = document.querySelector('#feelingTemp')
const humidity = document.querySelector('#humidity')
const wind = document.querySelector('#wind')
const error = document.querySelector('#error')
const loader = document.querySelector('.loader')
let citySearched = ''
async function getCity(){
    try{
        const response = await  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&&units=metric&APPID=c798a96f7f093719f778f3b8bd60f3f6`, {mode: 'cors'})
        const cityData = await response.json()
        console.log(cityData)
        error.innerText = ''
        forecast.style.display = 'block'
        cityName.innerText = `${cityData.name}`
        temp.innerText = `${cityData.main.temp}°C`
        feelingTemp.innerText = `Feels like: ${cityData.main.feels_like}°C`
        humidity.innerText = `Humidity: ${cityData.main.humidity}%`
        wind.innerText = `Wind: ${cityData.wind.speed} km/h`
        error.innerText = ''
        loader.style.display = 'none'
    }catch (err){
        loader.style.display = 'none'
        if(err.feels_like == undefined){
            cityName.innerText = ''
            temp.innerText = ''
            feelingTemp.innerText = ''
            humidity.innerText = ''
            wind.innerText = ''
            forecast.style.display = 'block'
            error.innerText = `city with that name doesn't exsist in our database try another city or check for type errors`
            forecast.appendChild(error)
            console.log(error)
        }else{
            console.log(err)
        }
    }
    
   }
form.addEventListener('submit', (e) => {
    e.preventDefault()
    citySearched = e.target[0].value
    console.log(e.target[0].value)
    getCity()
    loader.style.display = 'block'
    forecast.style.display = 'none'
})
   
