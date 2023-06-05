'use strict'
let date = document.querySelector('.day h4')
let mOnth = document.querySelector('.day span')
let inp = document.querySelector('input')
let tempr

inp.addEventListener('keyup', () => {
    getApi(inp.value)
})

async function getApi(inp) {
    try {
        if (inp == null) {
            inp = 'cairo'
        }
        console.log(inp, 'input');
        let weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key= e60ffa849c5c4fc197b231708232102&q=${inp}&days=3&aqi=yes&alerts=no`)
        tempr = await weather.json()
        console.log(tempr);
        showTemp()
    } catch (e) {
    }
}

getApi()

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
const toMorrow = new Date(today)
toMorrow.setDate(toMorrow.getDate() + 2)

function catchDate() {
    mOnth.innerHTML = today.getDate() + ' ' + month[today.getMonth()]
}

catchDate()


function days() {
    let tomorro = weekday[tomorrow.getDay()]
    let v = weekday[toMorrow.getDay()]
    date.innerHTML = weekday[today.getDay()]
    document.querySelector('.nextday h4').innerHTML = tomorro
    document.querySelector('.dayweak h4').innerHTML = v
}

let next
let day3
function showTemp() {
    let box = ''
    if (!tempr.error) {
        box +=
            `
            <h3>${tempr.location.name}</h3>
        <div class="door d-flex align-items-center justify-content-between">
        <h1>${tempr.current.temp_c}&#176;c</h1>
        <span><img src="https:${tempr.current.condition.icon}" class="wind" alt="wind"></span>
        </div>
        <p class="text-info fs-5 my-4">${tempr.current.condition.text}</p>`
    }
    let [date1, dat, date3] = tempr.forecast.forecastday
    next = dat.day
    day3 = date3.day
    document.querySelector('.dayweather').innerHTML = box
    days()
    nextDay()
    getDay3()
    atmospher()
}

function atmospher() {
    let box = ''
    box += `
    <p><i class="fa-solid fa-umbrella">&#xa0;</i>${tempr.current.wind_degree}</p>
    <p><i class="fa fa-plane"></i> ${tempr.current.wind_kph} km</p>
    <p class="d-flex align-items-center"><img src="image/dir.png" alt="dir"> ${tempr.location.tz_id}</p>
    `
    document.querySelector('.atmos').innerHTML = box
}

function nextDay() {
    let box = ''
    box += `
        <div class="dayweather mt-5">
        <img src="https:${next.condition.icon}" class="w-25" alt="photo">
            <h2 class="fs-1 my-4">${next.maxtemp_c}&#176;c</h2>
            <p>${next.mintemp_c}</p>
            <p class="fs-5 text-info">${next.condition.text}</p>
        </div>`
    document.querySelector('.next').innerHTML = box
}

function getDay3() {
    let box = ''
    box += `
        <img src="https:${day3.condition.icon}" class="w-25" alt="">
        <h2 class="fs-1 my-4">${day3.maxtemp_c}&#176;c</h2>
        <p>${day3.mintemp_c}</p>
        <p class="fs-5 text-info">${day3.condition.text}</p>
    `
    document.querySelector('.day3').innerHTML = box
}