//http://www.freeiconspng.com/free-images/maps-icon-8221
var map;
        var graphic;
        var currLocation;
        var watchId;
        var ZOOM = 14;
        var featureLayer;

    function drawMap(){

      require([
        "dojo/dom",
        "dojo/dom-construct",
        "esri/map", "esri/geometry/Point",
        "esri/symbols/PictureMarkerSymbol",
        "esri/graphic", "esri/Color",
        "esri/InfoTemplate",
        "esri/layers/FeatureLayer",
        "dojo/string",
        "esri/dijit/PopupTemplate",
        "esri/request",
        "dojo/on",
        "dojo/_base/array",
        "dojo/domReady!"
      ], function(
        dom,
        domConstruct,
        Map, Point,
        PictureMarkerSymbol,
        Graphic, Color,
        InfoTemplate,
        FeatureLayer,
        string,
        PopupTemplate,
        esriRequest,
        on,
        array
      ) {
      var symbolMe =  new PictureMarkerSymbol({
            "url":"/img/meArrow.png",
            "height":35,
            "width":25,
            "type":"esriPMS",
            "angle": 0
          });
          var symbolDonator =  new PictureMarkerSymbol({
            "url":"/img/donatorArrow.png",
            "height":35,
            "width":25,
            "type":"esriPMS",
            "angle": 0
          });


        map = new Map("map", {
          basemap: "topo",
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
              alert("Unknown error");
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
//hide the popup if its outside the map's extent
        map.on("mouse-drag", function(evt) {
          if (map.infoWindow.isShowing) {
            var loc = map.infoWindow.getSelectedFeature().geometry;
            if (!map.extent.contains(loc)) {
              map.infoWindow.hide();
            }
          }
        });
        map.on("click", function (evt) {
            if(evt.graphic)
                if(evt.graphic.attributes.name == "me")
                    showSignupForm();
        });
        var featureCollection = {
                  "layerDefinition": null,
                  "featureSet": {
                    "features": [],
                    "geometryType": "esriGeometryPoint"
                  }
                };
                featureCollection.layerDefinition = {
                  "geometryType": "esriGeometryPoint",
                  "objectIdField": "ObjectID",
                  "drawingInfo": {
                    "renderer": {
                      "type": "simple",
                      "symbol": symbolDonator
                    }
                  },
                  "fields": [{
                    "name": "ObjectID",
                    "alias": "ObjectID",
                    "type": "esriFieldTypeOID"
                  }, {
                    "name": "description",
                    "alias": "Description",
                    "type": "esriFieldTypeString"
                  }, {
                    "name": "title",
                    "alias": "Title",
                    "type": "esriFieldTypeString"
                  }]
                };

                //define a popup template
                        var popupTemplate = new PopupTemplate({
                          title: "{title}",

                          description: "{description}"
                        });

                        //create a feature layer based on the feature collection
                                featureLayer = new FeatureLayer(featureCollection, {
                                  id: 'donatorsLayer',
                                  infoTemplate: popupTemplate
                                });

                                //associate the features with the popup on click
                                featureLayer.on("click", function(evt) {
                                  map.infoWindow.setFeatures([evt.graphic]);
                                });

                                map.on("layers-add-result", function(results) {
                                  addDonators();
                                });

                                socket.on('update',function(data) {
                                    console.log("Info actualizada " + donators.length);
                                    console.log(data);
                                    donators.push(data);
                                    addDonators();
                                });

                                //add the feature layer that contains the flickr photos to the map
                                map.addLayers([featureLayer]);

                              function addDonators() {

                                var features = [];
                                array.forEach(donators, function(item) {
                                  var attr = {};
                                  attr["description"] = "<strong>Contact number:</strong> " + item.contactNumber +
                                  "<br><strong>Email address:</strong> " + item.email + "<br><strong>Blood type:</strong> " + item.bloodGroup;

                                  attr["title"] = item.firstName + " " + item.lastName;

                                  var geometry = new Point(item);
                                  var graphic = new Graphic(geometry);
                                  graphic.setAttributes(attr);
                                  features.push(graphic);
                                });

                                featureLayer.applyEdits(features, null, null);
                              }


        function addGraphic(pt){
          graphic = new Graphic(pt, symbolMe);
          graphic.setAttributes({
              id: 0,
              name: "me"
          });
          map.graphics.add(graphic);
        }

      });
      }