const express = require("express");
const path = require("path");
const dotevn = require('dotenv').config();
const session = require('express-session');

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const db = require('./db');
const passport = require('./passport');
const publicPath = path.resolve(__dirname, "..", "client", "dist");


app.use(express.static(publicPath));

app.get('/', function (req, res){
  res.sendFile('index.html', {root: 'client/dist'})
})

// set up sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: 'false',
  saveUninitialized: 'true'
}));

// hook up passport
app.use(passport.initialize());
app.use(passport.session());

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

http.listen(3000, () => {
  console.log(`Listening on port 3000 and looking in folder ${publicPath}`);
});

app.get(["/race"], (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});





