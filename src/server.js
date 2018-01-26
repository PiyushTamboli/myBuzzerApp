const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
var sendevent = require('sendevent');
var ws = require('ws')

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

var message="Ok";
var isGameOn = false;
// Send all other requests to the Angular app
app.get('/sendResponse/:game', (req, res) => {
    var milliseconds = (new Date).getTime();
    var doneIn = (isGameOn) ? milliseconds-req.params.game: -1;
    isGameOn = false;
    res.send("Done in " + doneIn);
});

app.get('/startGame', (req, res) => {
    var milliseconds = (new Date).getTime();
    res.send(String(milliseconds));
    isGameOn = true;
});

app.get('/abc', function (req, res) {
    res.sendFile(__dirname + '/ws.html');
 })

var WebSocketServer = ws.Server,
  wss = new WebSocketServer({port: 40510})
wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message)
  })
  setInterval(
    () => ws.send(`${new Date()}`),
    1000
  )
})


//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
