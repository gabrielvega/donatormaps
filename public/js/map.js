//http://www.freeiconspng.com/free-images/maps-icon-8221

var map;
      var graphic;
      var currLocation;
      var watchId;
      var ZOOM = 16;
      require([
        "esri/map", "esri/geometry/Point", 
        "esri/symbols/PictureMarkerSymbol",
        "esri/graphic", "esri/Color", "dojo/domReady!"
      ], function(
        Map, Point,
        PictureMarkerSymbol,
        Graphic, Color
      ) {
        map = new Map("map", {
          basemap: "topo",
          center: [-85.957, 17.140],
          zoom: ZOOM
        });
        map.on("load", initFunc);

        function orientationChanged() {
          if(map){
            map.reposition();
            map.resize();
          }
        }

        function initFunc(map) {
          if( navigator.geolocation ) {  
            navigator.geolocation.getCurrentPosition(zoomToLocation, locationError);
            watchId = navigator.geolocation.watchPosition(showLocation, locationError);
          } else {
            alert("Browser doesn't support Geolocation. Visit http://caniuse.com to see browser support for the Geolocation API.");
          }
        }

        function locationError(error) {
          //error occurred so stop watchPosition
          if( navigator.geolocation ) {
            navigator.geolocation.clearWatch(watchId);
          }
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Location not provided");
              break;

            case error.POSITION_UNAVAILABLE:
              alert("Current location not available");
              break;

            case error.TIMEOUT:
              alert("Timeout");
              break;

            default:
              alert("unknown error");
              break;
          }
        }

        function zoomToLocation(location) {
          var pt = new Point(location.coords.longitude, location.coords.latitude);
          addGraphic(pt);
          map.centerAndZoom(pt, ZOOM);
        }

        function showLocation(location) {
          //zoom to the users location and add a graphic
          var pt = new Point(location.coords.longitude, location.coords.latitude);
          if ( !graphic ) {
            addGraphic(pt);
          } else { // move the graphic if it already exists
            graphic.setGeometry(pt);
          }
          map.centerAt(pt);
        }
        
        function addGraphic(pt){
          var symbol =  new PictureMarkerSymbol({
              "url":"/img/blueArrow.png",
              "height":35,
              "width":25,
              "type":"esriPMS",
              "angle": 0
            });
          graphic = new Graphic(pt, symbol);
          map.graphics.add(graphic);
        }
      });