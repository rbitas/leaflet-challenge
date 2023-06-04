let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(function (data) {
    //console.log(data);
    createFeatures(data.features);
});

function depthColor(depth) {
    if (depth < 10) return "green";
    else if (depth < 30) return "greenyellow";
    else if (depth < 50) return "yellow";
    else if (depth < 70) return "orange";
    else if (depth < 90) return "redorange";
    else return "red";
};

function markerSize(magnitude){
      return magnitude * 4;
    }

function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p>`);
      };
    
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,

        pointToLayer: function(feature, latlng) {
            let earthquakeMarker = {
                stroke: true,
                radius: markerSize(feature.properties.mag),
                fillColor: depthColor(feature.geometry.coordinates[2]),
                fillOpacity: 0.7,
                color: "black"}
            return L.circleMarker(latlng, earthquakeMarker)
        }
     

    
    });

    createMap(earthquakes);
};

function createMap(earthquakes) {
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
    
    let baseMaps = {
        "Street Map": street
    };

    let overlayMaps = {
        Earthquakes: earthquakes
    };

    let myMap = L.map("map", {
        center: [
          37.09, -95.71
        ],
        zoom: 5,
        layers: [street, earthquakes]
      });
    
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

}

//L.circle([37.09, -95.71],{
   // radius: markerSize(feature.properties.mag),
   // fillColor: depthColor(feature.geometry.coordinates[2]),
    //fillOpacity: 0.7,
    //color: "black"
//}).addTo(myMap);
