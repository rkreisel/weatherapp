console.log('client side js loaded')

const weatherForm = document.querySelector('form');
const search = document.querySelector("input");
const errMsg = document.querySelector("#errMsg");
const locationLbl = document.querySelector("#location");
const currentTempC = document.querySelector("#currentTempC");
const currentTempF = document.querySelector("#currentTempF");
const conditionIcon = document.querySelector("#conditionIcon");
const conditionText = document.querySelector("#conditionText");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log(location);
    fetch("/weatherData?address="+ location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                console.log(data.error);
                errMsg.textContent = data.error;
                locationLbl.textContent = "";
                currentTempC.textContent = "";
                currentTempF.textContent = "";
                conditionIcon.src= "../img/MicroIcon.bmp";
                conditionText.textContent = ""
                return;
            }
            console.log(data);
            errMsg.textContent = "";
            locationLbl.textContent = data.forecastData.city + ", " + data.forecastData.region + " " + data.forecastData.country;
            currentTempC.textContent = data.forecastData.currentTempC;
            currentTempF.textContent = data.forecastData.currentTempF;
            conditionIcon.src=data.forecastData.conditions.icon;
            conditionText.textContent = data.forecastData.conditions.text
        })
    })
});
