// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var Donator = require(__dirname + '/models/Donator'); // get our mongoose model
var port = process.env.PORT || 3000;

//mongoose.connect("mongodb://admin:admin@jello.modulusmongo.net:27017/nahY8roq");

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// Donator Maps

var numUsers = 0;


io.on('connection', function (socket) {
  var addedUser = false;
  console.log('Usuario conectado');

  socket.on('login', function(data) {
  var donators = [{firstName: "Gabriel",
                  lastName: "Vega",
                  address: "Caracas",
                  contactNumber: "+584142769178",
                  email: "gaveho@gmail.com",
                  bloodGroup: "A+",
                  longitude: -67.044461,
                  latitude: 10.609385
                  },
                  {
                  firstName: "Karitza",
                lastName: "Pulgar",
                address: "Orlando",
                contactNumber: "+12731232312",
                email: "claraepulv81@gmail.com",
                bloodGroup: "O+",
                longitude:-67.011161,
                latitude: 10.602385
                }

                        ];
    //TODO Buscar los registros en Mongo

    console.log(data);
    socket.emit('login', donators);
  });

  // when the client emits 'new message', this listens and executes
  socket.on('donator', function (data) {
    // we tell the client to execute 'new message'
    console.log(data);
    //TODO Guardo en Mongo
    data.longitude = data.loc.type[0];
    data.latitude = data.loc.type[1];
    socket.emit('donator',{url: "url"});
    socket.broadcast.emit('update',data);
  });

});
