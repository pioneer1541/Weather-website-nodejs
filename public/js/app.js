const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationText = document.querySelector('#locationText')
const forecastText = document.querySelector('#forecastText')


weatherForm.addEventListener('submit',(event) => {
    event.preventDefault()
    let city = search.placeholder
    if (search.value != "") {
        city = search.value
    }
    locationText.textContent = "Loading..."
    forecastText.textContent = ""
    fetch('/index?search=' + city).then((res)=>{
        res.json().then((data) => {
            if (data.error) {
                return locationText.textContent = data.error
            }
            locationText.textContent = data.location
            forecastText.textContent = data.forecastData
        })
    })
})