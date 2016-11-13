var socket = io();
var address;
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
    socket.emit('login',{longitude: longitude, latitude: latitude, id: localStorage.donatormaps});
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
       address: address,
       contactNumber: "+584142769178",
       email: "gaveho@gmail.com",
       bloodGroup: "A+",
       loc:
         {
           lng: Number(longitude),
           lat: Number(latitude)
         }
       }
    socket.emit('donator',donator);
}

socket.on('donator',function(data) {
    console.log("on.donator");
    localStorage.donatormaps = data.url;
    console.log(data.url);
});