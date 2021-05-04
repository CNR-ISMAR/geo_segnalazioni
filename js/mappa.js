/***********************************
Author: Amedeo Fadini per Tepco srl
E-mail: tepco@tepco.it
Date: 2012-2015
License: Free BSD http://opensource.org/licenses/BSD-2-Clause

Copyright (c) 2012-2015, Tepco srl Vittorio Veneto
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

************************************/
//adjust these variables to fit your needs
// id of text input
var coord_control;
//attribute of text input in form where coordinates will be written
var latitude_id='lat';
var longitude_id='lon';

//initial center of the map
var center_lat = 45.42713;
var center_lon = 12.35858;
//intial zoom level
var map_zoom=11;

var map ;
/*******************************
BASE LAYERS
*****************************/
var OSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

var cignobase = L.tileLayer.wms('/mappalapinna/adl/gwc/service/wms?', {
        layers: 'carta_base'
    })

//var googleLayer = new L.Google();

//var bingLayer = new L.BingLayer("AndoO6AeN_kKQeM6pHMG-r-9ZhlpYJ5ug5ObUQELdZrIksuKMEF8r2K7DAe6ZQFA");


/*******************************
STYLES AND ICON
*****************************/
//styles and Icons
		var confini_style = {
			"color": "red",
			"weight": 3,
			"fillOpacity": 0.0
		};

		var segnaIcon = L.icon({
			iconUrl: './icone/segnalazione.png',
			iconSize: [23, 26],
			iconAnchor: [0, 26],
			popupAnchor: [11, -20]
		});
		var markIcon = L.icon({
			iconUrl: './icone/marker.png',
			iconSize: [18, 26],
			iconAnchor: [9, 26],
			popupAnchor: [9, 26]
		});

		function onEachFeature(feature, layer) {
			var popupContent = "<p>I started out as a GeoJSON " +
					feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

			if (feature.properties && feature.properties.popupContent) {
				popupContent = feature.properties.popupContent;
			    layer.bindPopup(popupContent);
			}


		}

/*******************************
OVERLAYS
*****************************/
	//overlays
	//confini geoJson


/*******************************
CREATE MAP
*****************************/


		map = new L.Map('map', {
			center: new L.LatLng(center_lat, center_lon),
			zoom: map_zoom,
			layers: [cignobase],
			zoomControl: true,
			inertia: false
		});


//layergroup e aggiunta layers
		var baseLayers = {
			"Base Atlante della Laguna": cignobase
			//,"Bing" : bingLayer
			,"OpenStreetMap": OSM
			// ,"IGM 25k": igmWMS
		};
		//var overlays = {
			//"Confine": confini
		//};


		layersControl = new L.Control.Layers(baseLayers);
map.addControl(layersControl);

		//crea un layergroup dove aggiungere i marker
		var segnalazione = new L.LayerGroup()
			.addTo(map);


		//crea un marker sulla mappa
		var segnala = function(e){
			//rimuove eventuali markers presenti dal layergroup
			segnalazione.clearLayers();
			//alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
			if (!e){
				point = map.getCenter();
				}
				else{
				point = e.latlng;
				}


			var latitude = point.lat.toFixed(5);
			var longitude = point.lng.toFixed(5);

			//aggiunge un layer al layergroup
			segnalazione.addLayer(L.marker([latitude, longitude], {icon: markIcon}));
			//modifica il contenuto della casella di testo desiderata
			document.getElementById(latitude_id).value = latitude;
      document.getElementById(longitude_id).value = longitude;

      var modalDiv = $('#mymodal');
      modalDiv.modal({backdrop: false, show: true});

		};
//due funzioni per attivare e disattivare il controllo personalizzato e l'inserimento di coordinate

				map.on('click', segnala)
				//map.off('geosearch_showlocation', segnala)
				//confini.off('click', segnala);

			   function hidepoint() {
			   segnalazione.clearLayers();
			   disattiva_coordinate();
			   };





PanZoomBoxControl = function(theZoomBoxFunction) {

    var control = new (L.Control.extend({
    options: { position: 'topright' },
    onAdd: function (map) {
        controlDiv = L.DomUtil.create('div', 'panzoom-button');
        L.DomEvent
            .addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
            .addListener(controlDiv, 'click', L.DomEvent.preventDefault)
            .addListener(controlDiv, 'click', this.ZoomBoxFunction);

        // Set CSS for the control border
        var controlUI = L.DomUtil.create('div', 'panzoom-button-border', controlDiv);
        controlUI.title = 'Click for Zoombox';

        // Set CSS for the control interior
        var controlText = L.DomUtil.create('div', 'panzoom-button-interior', controlUI);
        controlText.innerHTML = '';
		panzoomdiv = controlDiv;
        return controlDiv;
    }
    }));

    control.ZoomBoxFunction = theZoomBoxFunction;

    return control;
};


ZoomBoxFunction = function () {
	//alert(map.dragging._enabled);
			if(map.dragging._enabled == true){
				map.dragging.disable(),
				map.zoomBox.enable()
				panzoomdiv.className= "move-button leaflet-control"
				}else{
				map.dragging.enable(),
				map.zoomBox.disable(),
				panzoomdiv.className= "panzoom-button leaflet-control"
				};

};


map.addControl(PanZoomBoxControl(ZoomBoxFunction));
