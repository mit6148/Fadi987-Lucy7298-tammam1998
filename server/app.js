
const dotevn = require('dotenv').config();
// libraries
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const agx = require('./agxgame');


// local dependencies
const db = require('./db');
const passport = require('./passport');
const api = require('./routes/api');

// initialize express app
const app = express();
const publicPath = path.resolve(__dirname, "..", "client", "dist");

// set POST request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// set up sessions
app.use(session({
  secret: 'session-secret',
  resave: 'false',
  saveUninitialized: 'true'
}));

// hook up passport
app.use(passport.initialize());
app.use(passport.session());

app.get(['/profile'], function (req, res) {
  res.sendFile(path.join(__dirname, '../socket/dist', 'index.html'));
});

// authentication routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate(
    'google',
    { failureRedirect: '/login' }
  ),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/'); 
});

app.use('/api', api );
app.use(express.static(publicPath));

app.get(["/race", '/ranking'], (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});


// 404 route
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// route error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    status: err.status,
    message: err.message,
  });
});

// port config
const port = process.env.PORT || 3000; // config variable
const server = http.Server(app);

server.listen( port, function() {
  console.log('Server running on port: ' + port);
});

/////////////////////// socket stuff //////////////////



const io = socketio(server);
app.set('socketio', io);


let allGameRooms = new Map();
let closedRooms = new Map();


const leaveGame = () => {
  for (let room in io.sockets.adapter.rooms)
      socket.leave(room)
}


io.sockets.on('connection', function (socket) {
  let currRoom = socket.id;
  let currNews = null;
  let gameStarted = false;
  //console.log('client connected');
  /*
  GameObj{
    username: String,
    speed: number,
    percent: number,
  }
  */

  socket.on("creategame", () => {
    console.log("new game created")
    let rooms = io.sockets.adapter.rooms;
    let found_room = false;
    for (let room in rooms){
      if (room.includes("race") && rooms[room].length < 2 && !(closedRooms.has(room))){
          closedRooms.set(room,true)
          socket.join(room);
          socket.leave(socket.id)
          found_room = true;
          currRoom = room;
          currNews = allGameRooms.get(room);
          socket.emit("update_news", currNews)
          console.log("joined this room" + room);
          break;
        }
      }
    if(found_room === false){
      
      let thisGameId = 'race' + (( Math.random() * 100000 ) | 0).toString();
      currRoom = thisGameId;

      // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
      //socket.emit('newGameCreated', {gameId: thisGameId, mySocketId: socket.id});
      socket.emit("get_news")
      
      // Join the Room and wait for the players
      socket.join(thisGameId);
      socket.leave(socket.id);
    }
  });


  socket.on("news_returned", (newsList) =>{
    //socket.to(currRoom).emit('update_news', gameObj.speed);
    currNews = newsList;
    allGameRooms.set(currRoom,currNews)
    console.log("this is the news" + currNews)
  }); 

  
  socket.on("game_started", ()=>{
    gameStarted = true
    //console.log(allGameRooms)
  });
  

  socket.on("update", (gameObj) =>{
    if (gameStarted === false && io.sockets.adapter.rooms[currRoom].length == 2){
        gameStarted = true;
        allGameRooms.set(currRoom, currNews)
        io.in(currRoom).emit('start_game');
        console.log("game started !!!!")
    } else if (gameStarted){
      //console.log("update" + gameObj.speed + currRoom);
      socket.to(currRoom).emit('update_game', gameObj);
    }
  })

  socket.on("leaveGame", () =>{
    let rooms = io.sockets.adapter.rooms;
    console.log("user left")
    socket.leave(currRoom);
    currRoom = socket.id;
    let oldRoom = currRoom;
    if(!(oldRoom in rooms)){
      console.log("room deleted" + oldRoom)
      closedRooms.delete(oldRoom)
      allGameRooms.delete(oldRoom)
    }
    found_room = false;
    gameStarted = false;

  })

  

  socket.on("disconnect", () => {
    console.log("a user dced");
    console.log("user left")
    socket.leave(currRoom);
    let rooms = io.sockets.adapter.rooms;
    let oldRoom = currRoom;
    if(!(oldRoom in rooms)){
      closedRooms.delete(oldRoom)
      allGameRooms.delete(oldRoom)
    }
    currRoom = socket.id;
    gameStarted = false;
    found_room = false;

  });


});





