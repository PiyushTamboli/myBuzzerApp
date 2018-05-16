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

//Few default values
var isGameStarted = true;
var organizer='';
var isWinner = false;
var archive={};

var games = {
	"Piyush_::1" : {
		organizer : "Piyush",
		timeout : "-1", //sec
		ip: "127.0.0.1",
		started: 'now',//"time",
		players : {
			Piyush : '1'
		},
		questions: {
			1: 'Piyush'
		}
	}
}

app.get('/', function(req, res) {
	res.json(games)
})

app.post('/joinGame/:gameId/:playerId', function(req, res) {
	console.log(req.params.gameId);
	console.log(req.params.playerId);
	games[req.params.gameId].players[req.params.playerId]=0;
})

app.post('/startGame/:organizer', function(req, res) {
	console.log(req.params.organizer);
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log(ip);
	var gameKey=req.params.organizer + "_"+ ip;
	games[gameKey]={};
	games[gameKey].organizer=req.params.organizer;
	games[gameKey].players={};
	games[gameKey].questions={};
	var thisGameObject={};
	thisGameObject[gameKey]=games[gameKey];
	res.json(thisGameObject);
})

app.post('/hitBuzzer/:gameId/:playerId/:questionId', function (req, res) {
	games[req.params.gameId].questions[req.params.questionId]=req.params.playerId;
	games[req.params.gameId].players[req.params.playerId]=games[req.params.gameId].players[req.params.playerId]+1;
	res.json(games)
})

app.post('/startQuiz/:gameId', function (req, res) {
	games[req.params.gameId].questions[Object.keys(games[req.params.gameId].questions).length]="";
	res.json(games[req.params.gameId].players);
})
app.post('/stopGame/:gameId', function (req, res) {
	delete games[req.params.gameId];
	//games[req.params.gameId].questions[Object.keys(games[req.params.gameId].questions).length]="";
	res.json(games);
})

//

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
