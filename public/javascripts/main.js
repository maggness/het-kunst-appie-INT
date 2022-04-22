import './easterEggs.js'
import './openHelpText.js'
import './artworkZoom.js'

let socket = io()
let messages = document.querySelector('#chat')
let input = document.querySelector('[search-input]')
let nameinput = document.querySelector('[name_input]')
const formSection = document.querySelector('.usernameSection')

document.querySelector('[name-form]').addEventListener('submit', event => {
  event.preventDefault()
  console.log('naam ingevoerd');
  console.log(nameinput.value);
  if (nameinput.value) {
    socket.emit('new user', nameinput.value)
    formSection.classList.add('hidden')
  }
})

document.querySelector('[search-form]').addEventListener('submit', event => {
  event.preventDefault()
  console.log('zoeken');
  if (input.value) {
    socket.emit('message', input.value)
  }
})

socket.on('message', message => {
  messages.appendChild(Object.assign(document.createElement('li'), { innerHTML: '<a href=/search?q='+ message +'>' + message + '</a>' }))
  messages.scrollTop = messages.scrollHeight
})

// const installServiceWorker = async () => {
//   if ('serviceWorker' in navigator) {
//     try {
//       await navigator.serviceWorker.register('/service.js')
//     } catch (error) {
//       console.error(`Registration failed with ${error}`)
//     }
//   }
// }

// installServiceWorker()