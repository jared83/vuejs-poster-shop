var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var axios = require('axios');
var querystring = require('querystring');

require('dotenv').config();

var bodyParser = require('body-parser');
app.use( bodyParser.json() ); //Parses the body of a RESTful response to json

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html')); //Sends index.html to the client.
});

var instance = axios.create({ // axios instance used to send an (autthencitated) html request. Imgur in this case
  baseURL: 'https://api.imgur.com/3/', //what and where from?
  headers: { 'Authorization': 'Client-ID ' + process.env.IMGUR_CLIENT_ID } // Auth data
});

app.get('/search/:query', function(req, res) { // an end point from where the client will access the images' data returned from Imgur.
  const url = 'gallery/search/top/0/?' + querystring.stringify({ q: req.params.query }); // build url with query sent to imgur...
  instance.get(url) // sending the query to imgur
    .then(function (result) { // executes when querried validly...
      res.send(result.data.data.filter(item => !item.is_album && !item.nsfw && !item.animated)); // sending the data to the client while filtering out things we do not need.
    })
    .catch(function (error) { // executes when error occurred.
      console.log(error);
    })
  ;
});

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV !== 'production') { // setting up server for production.
  require('reload')(server, app); // live reload when in poduction.
}

server.listen(process.env.PORT, function () { // listening to requests on a defined port.
  console.log('Listening on port '.concat(process.env.PORT))
});
