// init project

var express = require('express');

var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)

// so that your API is remotely testable by FCC 

var cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html

app.get("/", function (req, res) {

  res.sendFile(__dirname + '/views/index.html');

});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

let resObj={}

app.get("/api/:date", function (req, res) {
let date = req.params.date;
  if(!isNaN(Date.parse(date))){
    resObj['unix']=new Date(Date.parse(date)).getTime();
    resObj['utc']=new Date(Date.parse(date)).toUTCString();
  }
  else {
    date=parseInt(date);
    resObj['unix']=new Date(date).getTime();
    resObj['utc']=new Date(date).toUTCString();}
  if(!resObj['unix'] || !resObj['utc']){
     res.json({"error": "Invalid date"});
    }
  res.json(resObj);
  })
 
app.get("/api", function (req, res) {
  resObj['unix']=new Date().getTime();
  resObj['utc']=new Date().toUTCString();
  res.json(resObj);
})