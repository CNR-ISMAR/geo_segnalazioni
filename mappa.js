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

var map ;
/*******************************
BASE LAYERS
*****************************/
var mapquestOSM = new L.TileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
	maxZoom: 17,
	subdomains: ["otile1", "otile2", "otile3", "otile4"],
	attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
});


var googleLayer = new L.Google(); 

var bingLayer = new L.BingLayer("AndoO6AeN_kKQeM6pHMG-r-9ZhlpYJ5ug5ObUQELdZrIksuKMEF8r2K7DAe6ZQFA");


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
	var confini = new L.geoJson(null,{ 
		style: confini_style
		
		});
	  $.getJSON("js/confine.geojson", function(data){
	        confini.addData(data);
			confini.eachLayer(function(layer){
				//alert(layer.getBounds().getCenter().toString());
				layer._container.style.pointerEvents='none';
			});
	    });

/*******************************
CREATE MAP
*****************************/



		map = new L.Map('map', {
			center: new L.LatLng(45.88941, 12.34400), 
			zoom: 14,
			layers: [mapquestOSM, confini],
			zoomControl: true,
			inertia: false
		});


//layergroup e aggiunta layers
		var baseLayers = {
			"Google": googleLayer
			,"Bing" : bingLayer
			,"MapQuest": mapquestOSM
			// ,"IGM 25k": igmWMS
		};
		var overlays = {
			"Confine": confini
		};


		layersControl = new L.Control.Layers(baseLayers,  overlays);
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
			
			document.getElementById("entry_641596452").value = latitude + "," + longitude;

			
			
		};
//due funzioni per attivare e disattivare il controllo personalizzato e l'inserimento di coordinate
				function attiva_coordinate(){
				map.on('click', segnala);
				//map.on('geosearch_showlocation', segnala)
				//confini.on('click', segnala);
			   };
			   	function disattiva_coordinate(){
				map.off('click', segnala);
				//map.off('geosearch_showlocation', segnala)
				//confini.off('click', segnala);
			   };
			   function hidepoint() {
			   segnalazione.clearLayers();
			   disattiva_coordinate();
			   };

			
	

var popup = L.popup();

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(map);
	}


//geocode control
geocode = new L.Control.GeoSearch({
				provider: new L.GeoSearch.Provider.Google({
				}),
			showMarker: false
			});
geocode.addTo(map);

//locate control
locateControl = L.control.locate({
    position: 'bottomleft',  // set the location of the control
    drawCircle: true,  // controls whether a circle is drawn that shows the uncertainty about the location
    follow: true,  // follow the location if `watch` and `setView` are set to true in locateOptions
    circleStyle: {},  // change the style of the circle around the user's location
    markerStyle: {},
    metric: true,  // use metric or imperial units
    onLocationError: function(err) {alert(err.message)}  // define an error callback function
})

locateControl.addTo(map);

//aggiungi il pcntrollo PanZoom
var panzoomControl = new L.Control.PanZoom ({
			pan: {
				position: 'topleft',
				showMarker: false
				}
		});
		map.addControl(panzoomControl);

//zoomButton.addTo(map);
//error: zoomButton is undefined

//map.on('click', onMapClick);
// zoom the map to the polyline
//map.fitBounds(segnalazioni.getBounds());


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

SegnalaControl = function(segnalazioneFunction) {

    var control = new (L.Control.extend({
    options: { position: 'topright' },
    onAdd: function (map) {
        controlDiv = L.DomUtil.create('div', 'segnala-button');
        L.DomEvent
            .addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
            .addListener(controlDiv, 'click', L.DomEvent.preventDefault)
            .addListener(controlDiv, 'click', this.SegnalaFunction);

        // Set CSS for the control border
        var controlUI = L.DomUtil.create('div', 'segnala-button-border', controlDiv);
        controlUI.title = 'Click for Segnalazione';

        // Set CSS for the control interior
        var controlText = L.DomUtil.create('div', 'segnala-button-interior', controlUI);
        controlText.innerHTML = '';
		
		segnaladiv = controlDiv;
        return controlDiv;
    }
    }));

    control.SegnalaFunction = segnalazioneFunction;

    return control;
};


SegnalaFunction = function () {
	//alert(map.dragging._enabled);
			if(map.dragging._enabled == true){
				map.dragging.disable(),
				map.zoomBox.enable(),
				controlText.innerHTML = 'Pan';
				}else{
				map.dragging.enable(),
				map.zoomBox.disable(),
				controlText.innerHTML = 'Zoom';
				};
			segnaladiv.className= "segnala-button-active leaflet-control";
};


map.addControl(SegnalaControl(SegnalaFunction));