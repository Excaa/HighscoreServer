//Simple server using express.
//Static items are under public.

const path = require("path");

const express = require('express')
const bodyParser = require("body-parser");
const session = require("express-session");
const helmet = require("helmet");
const cors = require("cors");

//Public commands
const list = require("./server/List");
const submit = require("./server/Submit");

//DB+config
const db = require("./server/DBHelper");
const config = require("./config");

//Build express.
const app = express()

//Add helmet for security
app.use(helmet());

//Setup secure cookies
app.set("trust proxy", 1);
app.use(session({
	name:"sessionId",
	secret:"secretKey",
	resave:true,
	saveUninitialized:false,
	cookie:{
		secure:false,
		httpOnly:true,
		maxAge: 24*60*60*1000//24 hour cookies
	}
}));

//parse json documents.
app.use(bodyParser.json({ limit:'1mb' })); 

//Start listening to wanted port.
app.listen(config.PORT, () => console.log('Highscore server started on port '+config.PORT))

//Init db connection
db.Init();

//Allow cors on all requests.
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

//Serve static files
//Remove this to disable "admin" view.
app.use(express.static("public"));

//App commands
app.get("/list/:gameid/:sorting/:limit/:page", list.Handle);
app.post("/submit/", submit.Handle);