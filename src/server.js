const express = require('express')

var bodyParser = require("body-parser");

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();

});



var isGameStarted = true;

var organizer=''

var isWinner = false;

var players={}

players['Piyush']=1;



app.get('/', function(req, res) {

 res.json({'organizer': organizer, 'players':players})

})



app.get('/startGame', function (req, res) {

 isGameStarted = true;

 res.send('Game Started!');

})



app.get('/hitBuzzer', function (req, res) {

 isWinner = isGameStarted;

 isGameStarted = false;

 res.send(isWinner)

})



app.post('/initGame',function(req,res){

 //console.log(req.body)

 if (req.body.role=='Organizer' && organizer=='') {

  organizer = req.body.firstName;

 } else {

  players[req.body.firstName]=0;

 }

 res.json({'organizer': organizer, 'players':players})

});



app.listen(3000, () => console.log('Example app listening on port 3000!'))