// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var Donator = require(__dirname + '/models/Donator'); // get our mongoose model
var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://admin:admin@jello.modulusmongo.net:27017/nahY8roq");

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// Donator Maps

var numUsers = 0;


io.on('connection', function (socket) {
  var addedUser = false;


  socket.on('login', function(data) {
    console.log('Usuario conectado');
    console.log(data);
    if(String(data.id).length != 24)
        data.id = "000000000000000000000000";
    Donator.find({ _id: {$ne: ObjectId(data.id)} })
      .exec(function (err, donatorList) {

        if(err)
            console.log(err);

        var donators = [];
        var don;

        donatorList.forEach(function (currentValue, index, arr) {

          don = {

            "_id": currentValue._id,
            "firstName": currentValue.firstName,
            "lastName": currentValue.lastName,
            "address": currentValue.address,
            "contactNumber": currentValue.contactNumber,
            "email": currentValue.email,
            "bloodGroup": currentValue.bloodGroup,
            "ip": currentValue.ip,
            "longitude": currentValue.loc.lng,
            "latitude": currentValue.loc.lat,
            "created": currentValue.created
          }

          donators.push(don);
        });
        socket.emit('login', donators);
      });


  });


  socket.on('donator', function (data) {
//TODO If donatorId != "" then have to update
    var newDonator = new Donator({
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        contactNumber: data.contactNumber,
        email: data.email,
        bloodGroup: data.bloodGroup,
        ip: socket.handshake.address,
        loc: data.loc,
        created: String(new Date())
    });

    newDonator.save(function (err,donator) {
        if (err){
        console.log(err);
        throw (err);
        }
        console.log("Donator " + data.firstName + " " + data.lastName + " saved successfully");
        console.log(donator);
        data.longitude = data.loc.lng;
        data.latitude = data.loc.lat;
        socket.emit('donator',{url: donator._id, ip:donator.ip, address: data.address,loc: donator.loc});
        socket.broadcast.emit('update',data);
      });//newDonator

  });

});
