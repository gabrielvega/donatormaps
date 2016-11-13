var socket = io();
var longitude;
var latitude;


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    console.log("Geolocation is not supported by this browser.") ;
}


function showPosition(position) {
    latitude = position.coords.latitude + Math.random();;
    longitude = position.coords.longitude + Math.random();;
    socket.emit('login',{longitude: longitude, latitude: latitude});
}



socket.on('login',function(data){
    console.log('Login');
    console.log(data);
    donators = data;
    drawMap();
});

var donators;
var clicked = 1;

function showSignupForm(){
    console.log("Bienvenido al formulario de registro");
}

function newDonator(){

    var donator = {
       firstName: "Gabriel",
       lastName: "Vega",
       address: "Caracas",
       contactNumber: "+584142769178",
       email: "gaveho@gmail.com",
       bloodGroup: "A+",
       ip: "192.168.1.2",
       loc:
         {
           type: [-67.014461 + (Math.random()*2), 10.609685 - (Math.random()*2)],  // [<longitude>, <latitude>]
           index: '2d'      // geospatial index
         },
       created: new Date()
       }
    socket.emit('donator',donator);
}

socket.on('donator',function(data) {
    console.log("on.donator");
    console.log(data);
});