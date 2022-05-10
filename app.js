const express = require("express");
const app = express();
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const fetch = require("node-fetch");
const { log } = require("console");

const port = process.env.PORT || 333;
const apiURL = "https://www.rijksmuseum.nl/api/nl/collection";
const searchValue = "";
let artLength = "10";

require("dotenv").config();

const { API_KEY } = process.env;

// Link the templating engine to the express app
app.set("view engine", "ejs");

// Tell the views engine/ejs where the template files are stored (Settingname, value)
app.set("views", "views");

// Tell express to use a 'public' folder
app.use(express.static(path.resolve('public')))

// render home
app.get("/", (req, res) => {
  fetch(
    `${apiURL}?key=${API_KEY}&q=${searchValue}&ps=${artLength}&imgonly=true`
  )
    .then(async (response) => {
      const artWorks = await response.json();
      res.render("index", {
        title: "Home",
        data: artWorks.artObjects,
      });
    })
    .catch((err) => res.send(err));
});

// render art detail
app.get("/art/:id", (req, res) => {
  fetch(`${apiURL}/${req.params.id}?key=${API_KEY}&imgonly=true`)
    .then(async (response) => {
      const artWorks = await response.json();
      res.render("results", {
        title: "Artwork: " + req.params.id,
        data: artWorks.artObject,
      });
    })
    .catch((err) => res.send(err));
});

app.get("/offline", (req, res) => {
  res.render("offline", {
    title: "You are Offline",
  });
});

app.get("/search", (req, res) => {
  const searchValue = req.query.q;
  fetch(
    `${apiURL}?key=${API_KEY}&q=${searchValue}&ps=${artLength}&imgonly=true`
  )
    .then(async (response) => {
      const artWorks = await response.json();
      res.render("index", {
        title: "Results for " + searchValue,
        data: artWorks.artObjects,
      });
    })
    .catch((err) => res.send(err));
});

app.get("/interactiveRoom/:id", (req, res) => {
  fetch(`${apiURL}/${req.params.id}?key=${API_KEY}&imgonly=true`)
    .then(async (response) => {
      roomId = req.params.id
      const artWorks = await response.json();
      res.render("interactiveRoom", {
        title: "interactiveRoom: " + req.params.id,
        data: artWorks.artObject,
      });
    })
    .catch((err) => res.send(err));
});

let name = []

io.on('connection', (socket) => {
  // socket.on('join room', (room) => {
  //   socket.join(room);
  //   console.log(socket.rooms);
  // })

  socket.on('new user', (username) => {
    name.push(username)
    io.emit("new user", {name: username , id: socket.id})
    console.log(name + " connected, now " + name.length + " connected");
  })

  socket.on('update human left', (distance) => {
    io.emit('update human left', {left : distance, id: socket.id})
  })

  socket.on('update human top', (distance) => {
    io.emit('update human top', {top : distance, id: socket.id})
  })

  socket.on('message', (message) => {
    io.emit('message', {naam: name, bericht: message, id: socket.id})
  })

  socket.on('disconnect', () => {
    console.log(`${name} left`)
    io.emit('user left', {naam: name, id: socket.id})
    name.splice(name.length - 1)
    console.log('users connected: ' + name.length)
  })
})

http.listen(port, () => {
  console.log(
    `Lekker man, hij is hier te vinden: http://127.0.0.1:${port}/, zo niet zoek het uit.`
  );
});
