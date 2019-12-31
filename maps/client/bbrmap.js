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
    iconSize: [30, 30]
});  

//Popups für GeoJSON Layers
function onEachFeature(feature, layer) {
   
    if (feature.properties && feature.properties.name) {
        layer.bindPopup(
            "<h3>BBR Blühfläche</h3>" +
            "<b>Standortbezeichnung</b>: " + feature.properties.name + "<br>" +
            "<b>Beschreibung</b>: " + feature.properties.description + "<br>"
        );
    }
}

var bee_layer = L.geoJSON(blueflaechen, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: beeIcon})
    }
});


//Map mit Layer Control
var map = L.map('mapid', {
    center: [48.300, 8.757], 
    zoom: 12,
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
