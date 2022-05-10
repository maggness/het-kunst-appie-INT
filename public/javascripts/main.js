import './easterEggs.js'
import './openHelpText.js'
import './artworkZoom.js'

let socket = io()
let input = document.querySelector('[speakForm-input]')
let nameinput = document.querySelector('[name_input]')
const formSection = document.querySelector('.usernameSection')
const humanSpawner = document.querySelector('#humanSpawner')
const showOnline = document.querySelector('#online')
let clientName ="";

if (window.location.href.indexOf("interactiveRoom") > -1) {
//Create new user name
document.querySelector('[name-form]').addEventListener('submit', event => {
  event.preventDefault()
  if (nameinput.value) {
    socket.emit('new user', nameinput.value)

    //Code for rooms
    // const room = document.querySelector('[paintItem]').id;
    // socket.emit('join room', room);

    clientName = nameinput.value
    walking()
    formSection.classList.add('hidden')
}})

//Spawn new user
socket.on('new user', user => { 
  humanSpawner.appendChild(Object.assign(document.createElement('div'), { innerHTML: `<div id='`+user.id+`' style="--humanName: '`+user.name+`';" class="human"></div>` }))
  showOnline.appendChild(Object.assign(document.createElement('li'), { innerHTML: "<p "+user.id+">"+user.name+"</p>" }))
})

// Movement Humans
socket.on('update human left', playerMovementLeft => {
  if ( document.getElementById(playerMovementLeft.id) != null ) {
    document.getElementById(playerMovementLeft.id).style.setProperty("--left", playerMovementLeft.left);
  }
})

socket.on('update human top', playerMovementTop => { 
  if ( document.getElementById(playerMovementTop.id) != null ) {
    document.getElementById(playerMovementTop.id).style.setProperty("--top", playerMovementTop.top);
  }
})

//Chat function
document.querySelector('[speakForm]').addEventListener('submit', event => {
  event.preventDefault()
  console.log('zoeken');
  if (input.value) {
    socket.emit('message', input.value)
    input.value = ''
  }
})

socket.on('message', item => {
  let messages = document.getElementById(item.id)
  messages.appendChild(Object.assign(document.createElement('li'), { innerHTML: item.bericht }))
})

  socket.on('user left', user => {
    if ( document.querySelector('['+user.id+']') != null ) {
      document.querySelector('['+user.id+']').remove();
      document.getElementById(user.id).remove();
    }
  })
}
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

document.addEventListener("keydown", (event) => {
  const human = document.getElementById(socket.id)
  const focusLeft = human.getBoundingClientRect().left/window.innerWidth*100
  const focusTop = human.getBoundingClientRect().top/window.innerHeight*100

    if (event.keyCode === 39) {
        event.preventDefault();
        if (parseInt(focusLeft.toFixed(0)) < 80) { 
        // human.style.setProperty("--left", parseInt(focusLeft.toFixed(0)) + 5 * fastSpeed);
          socket.emit('update human left', parseInt(focusLeft.toFixed(0)) + 5 * fastSpeed)
        }
    }

    if (event.keyCode === 37) {
        event.preventDefault();
        if (parseInt(focusLeft.toFixed(0)) > 20) {
        // human.style.setProperty("--left", parseInt(focusLeft.toFixed(0)) - 5 * fastSpeed);
          socket.emit('update human left', parseInt(focusLeft.toFixed(0)) - 5 * fastSpeed)
        }
    }

    if (event.keyCode === 38) {
        event.preventDefault();
        if (parseInt(focusTop.toFixed(0)) > 78) {
        // human.style.setProperty("--top", parseInt(focusTop.toFixed(0)) - 5 * fastSpeed);
          socket.emit('update human top', parseInt(focusTop.toFixed(0)) - 5 * fastSpeed)
        }
    }

    if (event.keyCode === 40) {
        event.preventDefault();
        if (parseInt(focusTop.toFixed(0)) < 90) {
        // human.style.setProperty("--top", parseInt(focusTop.toFixed(0)) + 5 * fastSpeed);
          socket.emit('update human top', parseInt(focusTop.toFixed(0)) + 5 * fastSpeed )
        }
    }
});
}