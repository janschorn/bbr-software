//Base Layers

var osm_layer = L.tileLayer.wms("https://maps.heigit.org/osm-wms/service?", {
    layers: 'osm_auto:all',
    format: 'image/png',
    transparent: true,
    attribution: "OSM-WMS Uni Heidelberg © OpenStreetMap contributors, CC BY-SA",
    opacity: 0.7
});
var hillshade_layer = L.tileLayer.wms("https://maps.heigit.org/osm-wms/service?", {
    layers: 'europe_wms:hs_srtm_europa',
    format: 'image/png',
    transparent: true,
    attribution: "OSM-WMS Uni Heidelberg © OpenStreetMap contributors, CC BY-SA"
});
var basemapgroup = L.layerGroup([hillshade_layer,osm_layer]);

var kreis_layer = L.tileLayer.wms("https://sgx.geodatenzentrum.de/wms_vg250?", {
    layers: 'vg250_krs',
    format: 'image/png',
    transparent: true,
    color: '#000000',
    weight: 5,
    attribution: "<a href='https://www.govdata.de/dl-de/by-2-0' target='_blank'>© Bundesamt für Kartographie und Geodäsie</a>"
});


//GeoJSON Layers
var beeIcon = L.icon({
    iconUrl: 'img/bee.png',
    iconSize: [25, 25]
});

//Popups für GeoJSON Layers
function onEachFeature(feature, layer) {
    if (feature.properties) {
        layer.bindPopup("<h3>" + feature.properties.name + "</h3>" +
            "<b>Fläche (ha)</b>: " + feature.properties.area + "<br>"
        );
    }
}

var bee_layer = L.geoJSON(null, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: beeIcon})
    }
});

$.getJSON("geojson.php", function(data) {
	bee_layer.addData(data);
	}
);


//Map mit Layer Control
var map = L.map('mapid', {
    center: [51, 10], 
    zoom: 6,
    layers:[basemapgroup,bee_layer]
});

var baseMaps ={
    "OpenStreetMap": basemapgroup,
    "Kreise": kreis_layer
};
var overlayMaps = {
    "Blühflächen": bee_layer
};
L.control.layers(baseMaps, overlayMaps).addTo(map);
