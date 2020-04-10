console.log('Client side js')

// fetch('http://puzzle.mead.io/puzzle')
//     .then((response) => {
//         response.json().then((data) =>{
//             console.log(data)
//         })
//     })

// fetch('http://localhost:3000/weather?search=Palmerston%20North').then((res)=>{
//     res.json().then((data) => {
//         if (data.error) {
//             return console.log('error')
//         }
//         console.log(data.location)
//         console.log(data.forecastData)
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationText = document.querySelector('#locationText')
const forecastText = document.querySelector('#forecastText')



weatherForm.addEventListener('submit',(event) => {
    event.preventDefault()
    const city = search.placeholder
    if (search.value != "") {
        city = search.value
    }

    locationText.textContent = "Loading..."
    forecastText.textContent = ""
    fetch('http://localhost:3000/weather?search=' + city).then((res)=>{
        res.json().then((data) => {
            if (data.error) {
                return locationText.textContent = data.error
            }
            locationText.textContent = data.location
            forecastText.textContent = data.forecastData
        })
    })
})