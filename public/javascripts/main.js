import './easterEggs.js'
import './openHelpText.js'
import './artworkZoom.js'
// import {walking} from './walking.js'

let socket = io()
let messages = document.querySelector('#chat')
let input = document.querySelector('[search-input]')
let nameinput = document.querySelector('[name_input]')
const formSection = document.querySelector('.usernameSection')
const humanSpawner = document.querySelector('#humanSpawner')
const showOnline = document.querySelector('#online')

let clientName

//Create new user name
document.querySelector('[name-form]').addEventListener('submit', event => {
  event.preventDefault()
  if (nameinput.value) {
    socket.emit('new user', nameinput.value)
    clientName = nameinput.value
    walking()
    formSection.classList.add('hidden')
}})

//Spawn new user
socket.on('new user', username => { 
  console.log(username + ' naam ' + socket.id.toUpperCase() + ' id');
  humanSpawner.appendChild(Object.assign(document.createElement('div'), { innerHTML: `<div id='`+username+`' style="--humanName: '`+username+`';" class="human"></div>` }))
})

socket.on('new user', username => { 
  showOnline.appendChild(Object.assign(document.createElement('ul'), { innerHTML: `<li>`+username+`</li>` }))
})

// Movement Humans
socket.on('update human left', left => {
  document.querySelector('#'+clientName).style.setProperty("--left", left);
})

socket.on('update human top', top => { 
  document.querySelector('#'+clientName).style.setProperty("--top", top);
})

//Chat function
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

const walking = () => {

let fastSpeed = 1; 
// const fastmsg = document.getElementById('fastdragmsg')

document.addEventListener("keydown", (event) => {
  console.log(clientName);
  // let input = document.querySelector('[search-input]')
  // const human = document.getElementById(humanidSet);

  // console.log(socket.id.toUpperCase())

  const human = document.querySelector('#'+clientName)
  
  // console.log(human + ' plis werk');

  const focusLeft = human.getBoundingClientRect().left/window.innerWidth*100
  const focusTop = human.getBoundingClientRect().top/window.innerHeight*100

  if (event.keyCode === 90) {
    
    fastSpeed = fastSpeed + 4
    if (fastSpeed > 5) {
      fastSpeed = 1
    }

    // if (fastmsg.textContent === 'Fast drag is ON, press Z to turn it ON') {
    //   fastmsg.textContent = 'Fast drag is OFF, press Z to turn it OFF'
    // } else {
    //   fastmsg.textContent = 'Fast drag is ON, press Z to turn it ON'
    // }
  }

//   if (event.keyCode === 13) {
//     console.log('enter');
//     document.activeElement.classList.add('enterAdded');
//     document.activeElement.blur()

//     if (focusLeft > 59 && focusTop > 59) {
//       event.target.style.transform = 'scale(0)'
//     }
//   }

    if (event.keyCode === 39) {
        event.preventDefault();
        // human.style.setProperty("--left", parseInt(focusLeft.toFixed(0)) + 5 * fastSpeed);
        socket.emit('update human left', parseInt(focusLeft.toFixed(0)) + 5 * fastSpeed)
    }

    if (event.keyCode === 37) {
        event.preventDefault();
        // human.style.setProperty("--left", parseInt(focusLeft.toFixed(0)) - 5 * fastSpeed);
        socket.emit('update human left', parseInt(focusLeft.toFixed(0)) - 5 * fastSpeed)
    }

    if (event.keyCode === 38) {
        event.preventDefault();
        // human.style.setProperty("--top", parseInt(focusTop.toFixed(0)) - 5 * fastSpeed);
        socket.emit('update human top', parseInt(focusTop.toFixed(0)) - 5 * fastSpeed)
    }

    if (event.keyCode === 40) {
        event.preventDefault();
        // human.style.setProperty("--top", parseInt(focusTop.toFixed(0)) + 5 * fastSpeed);
        socket.emit('update human top', parseInt(focusTop.toFixed(0)) + 5 * fastSpeed)
    }
});
}