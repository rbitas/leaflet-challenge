let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(function (data) {
    //console.log(data);
    createFeatures(data.features);
});

function depthColor(depth) {
    if (depth < 10) return "#00FF00";
    else if (depth < 30) return "#B3FF00";
    else if (depth < 50) return "#FFFF00";
    else if (depth < 70) return "#FFA500";
    else if (depth < 90) return "#FF4500 ";
    else return "#FF0000";
};

function markerSize(magnitude){
    return magnitude * 1000
};

function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer) {
        layer.bindPopup(`Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p>`);
      }
}









let usaMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let earthquake = L.layerGroup();

let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetLayer, bikeMarkerGroup]
  });