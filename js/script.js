// This script demonstrates some simple things one can do with leaflet.js


var map = L.map('map').setView([40.71,-73.93], 11);

// set a tile layer to be CartoDB tiles 
var CartoDB_DarkMatter = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});
// add these tiles to our map
map.addLayer(CartoDB_DarkMatter);

// function main() {
//     var map = new L.Map('map', {
//       zoomControl: false,
//       center: [43, 0],
//       zoom: 3
//     });
//     L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
//       attribution: 'Stamen'
//     }).addTo(map);
//     cartodb.createLayer(map, 'http://documentation.cartodb.com/api/v2/viz/2b13c956-e7c1-11e2-806b-5404a6a683d5/viz.json')
//         .addTo(map)
//      .on('done', function(layer) {
//       layer.setInteraction(true);
//       layer.on('featureOver', function(e, latlng, pos, data) {
//         cartodb.log.log(e, latlng, pos, data);
//       });
//       layer.on('error', function(err) {
//         cartodb.log.log('error: ' + err);
//       });
//     }).on('error', function() {
//       cartodb.log.log("some error occurred");
//     });
//   }
//   // you could use $(window).load(main);
//   window.onload = main;




// create global variables we can use for layer controls
var pmGeoJSON;
var no2GeoJSON;
var o3GeoJSON; 

// // use jQuery get geoJSON to grab geoJson layer, parse it, then plot it on the map
// // because of the asynchronous nature of Javascript, we'll wrap each "getJSON" call in a function, and then call each one in turn. This ensures our layer will work  
addpmData();
function addpmData() {

    // let's add pm data
    $.getJSON( "geojson/Fine_Particulate_Matter.geojson", function( data ) {
        // ensure jQuery has pulled all data out of the geojson file
        var pm = data;

        // pm choropleth map
        var pmStyle = function (feature){
            var value = feature.properties.right_data_value;
            var fillColor = null;
            if(value >= 7.15 && value <=8){
                fillColor = "#fee5d9";
            }
            if(value >8 && value <=9){
                fillColor = "#fcbba1";
            }
            if(value >9 && value<=10){
                fillColor = "#fc9272";
            }
            if(value > 10 && value <=11){
                fillColor = "#fb6a4a";
            }
            if(value > 11) { 
                fillColor = "#a50f15";
            }
     

            var style = {
                weight: 1,
                opacity: .1,
                color: 'white',
                fillOpacity: 0.75,
                fillColor: fillColor
            };

            return style;
        }

        var pmClick = function (feature, layer) {
            // let's bind some feature properties to a pop up
            layer.bindPopup("<strong> PM Level:</strong> "+ feature.properties.right_data_value +"<strong>Neighborhood:</strong> " + feature.properties.right_geo_entity_name + "<br /><strong>Borough:</strong>" + feature.properties.borough);
        }

        // create Leaflet layer using L.geojson; don't add to the map just yet
        pmGeoJSON = L.geoJson(pm, {
            style: pmStyle,
            onEachFeature: pmClick
        });
        
        addNOData();
        
    });
        
}

function addNOData() {        
        // let's add neighborhood data
    $.getJSON( "geojson/NO2.geojson", function( data ) {
        // ensure jQuery has pulled all data out of the geojson file
        var n2 = data;

        // pm choropleth map
        var n2Style = function (feature){
            var value = feature.properties.right_data_value;
            var fillColor = null;
            if(value >= 11 && value <=14){
                fillColor = "#fee5d9";
            }
            if(value >14 && value <=17){
                fillColor = "#fcbba1";
            }
            if(value >17 && value<=20){
                fillColor = "#fc9272";
            }
            if(value > 20 && value <=23){
                fillColor = "#fb6a4a";
            }
            if(value > 23) { 
                fillColor = "#a50f15";
            }
     

            var style = {
                weight: 1,
                opacity: .1,
                color: 'white',
                fillOpacity: 0.75,
                fillColor: fillColor
            };

            return style;
        }

        var n2Click = function (feature, layer) {
            var percent = feature.properties.right_data_value;
            // let's bind some feature properties to a pop up
            layer.bindPopup("<strong> NO2 Level:</strong> "+ feature.properties.right_data_value +"<strong>Neighborhood:</strong> " + feature.properties.right_geo_entity_name + "<br /><strong>Borough:</strong>" + feature.properties.borough);
        }

        // create Leaflet layer using L.geojson; don't add to the map just yet
        no2GeoJSON = L.geoJson(n2, {
            style: n2Style,
            onEachFeature: n2Click
        });
        addo3Data();
    });

        
}

function addo3Data() {
    
        // let's add pm data
        $.getJSON( "geojson/Ozone.geojson", function( data ) {
            // ensure jQuery has pulled all data out of the geojson file
            var o3 = data;
    
            // o3 choropleth map
            var o3Style = function (feature){
                var value = feature.properties.right_data_value;
                var fillColor = null;
                if(value >= 7.15 && value <=8){
                    fillColor = "#fee5d9";
                }
                if(value >8 && value <=9){
                    fillColor = "#fcbba1";
                }
                if(value >9 && value<=10){
                    fillColor = "#fc9272";
                }
                if(value > 10 && value <=11){
                    fillColor = "#fb6a4a";
                }
                if(value > 11) { 
                    fillColor = "#a50f15";
                }
         
    
                var style = {
                    weight: 1,
                    opacity: .1,
                    color: 'white',
                    fillOpacity: 0.75,
                    fillColor: fillColor
                };
    
                return style;
            }
    
            var o3Click = function (feature, layer) {
                // let's bind some feature properties to a pop up
                layer.bindPopup("<strong> O3 Level:</strong> "+ feature.properties.right_data_value +"<strong>Neighborhood:</strong> " + feature.properties.right_geo_entity_name + "<br /><strong>Borough:</strong>" + feature.properties.borough);
            }
    
            // create Leaflet layer using L.geojson; don't add to the map just yet
            o3GeoJSON = L.geoJson(o3, {
                style: o3Style,
                onEachFeature: o3Click
            });
            pmGeoJSON.addTo(map)   
            o3GeoJSON.addTo(map)
            no2GeoJSON.addTo(map) 
            createLayerControls()
        });
            
}

function createLayerControls(){
// add in layer controls
     var baseMaps = {
        "Dark": CartoDB_DarkMatter
    };

     var overlayMaps = {
        "Ozone": o3GeoJSON,
        "Particulate Matter": pmGeoJSON,
        "Nitrogen Dioxide": no2GeoJSON,
        
   };

    // add control
    L.control.layers(baseMaps, overlayMaps).addTo(map);

}








