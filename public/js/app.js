const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = ''
    messageTwo.textContent = ''
    if (location.length == 0){
        return messageOne.textContent = 'You must enter an address'
    }
    messageOne.textContent = 'Loading...'
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
                if (data.error){
                    return messageOne.textContent = data.error
                }
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
        })
    })
})