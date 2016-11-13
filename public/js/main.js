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

function newDonator(data){
console.log(data);
    var donator = {
       firstName: data.firstName,
       lastName: data.lastName,
       address: address,
       contactNumber: data.contactNumber,
       email: data.email,
       bloodGroup: data.bloodGroup,
       loc:
         {
           lng: Number(longitude),
           lat: Number(latitude)
         }
       }
    //socket.emit('donator',donator);
}

function makeid(lon)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < lon; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function makeblood()
{
    var text = "";
    var possible = ["A","B","O","AB"];
    text = possible[Math.floor(Math.random() * possible.length)];

    return text;
}

function nuevoDonator(){

    var donator = {
       firstName: makeid(10),
       lastName: makeid(8),
       address: makeid(4)+ ", " + makeid(6) ,
       contactNumber: Math.floor(Math.random() * 99999999),
       email: makeid(7)+"@"+makeid(5)+".com",
       bloodGroup: makeblood(),
       loc:
         {
           lng: Number(Math.random() * 10),
           lat: Number(Math.random() * -40)
         }
       }
    socket.emit('donator',donator);
}

socket.on('donator',function(data) {
    console.log("on.donator");
    localStorage.donatormaps = data.url;
    console.log(data.url);
});