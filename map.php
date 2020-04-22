	<script type="text/javascript">
		!window.jQuery && document.write('<title>form singolo</title><script src="./js/jquery-1.7.min.js"><\/script>');
	</script>
<!-- generalcss files -->
<link type="text/css" rel="stylesheet" href="./css/segnala.css">
<link type="text/css" rel="stylesheet" href="./css/mappa.css">
	<!--loading stylesheet-->
<link rel="stylesheet" href="../leaflet-0.5/leaflet.css" />
<link rel="stylesheet" href="../leaflet-0.5/plugins/leaflet.panzoom.css" />
 <!--[if lte IE 8]>
     <link rel="stylesheet" href="leaflet-0.5/leaflet.ie.css" />
 <![endif]-->
<script src="../leaflet-0.5/leaflet-src.js"></script>
<script src="../leaflet-0.5/plugins/Toolbar.js"></script>
<script src="../leaflet-0.5/plugins/leaflet-panzoom.js"></script>
<script src="../leaflet-0.5/plugins/control/Distance.js"></script>
<script src="../leaflet-0.5/plugins/Google.js"></script>
<script src="../leaflet-0.5/plugins/Bing.js"></script>
<!-- geocode control -->
<script type="text/javascript">
	var nomeComune = '';
</script>	
<script src="../leaflet-0.5/plugins/L.GeoSearch/src/js/l.control.geosearch.js"></script>
<script src="../leaflet-0.5/plugins/L.GeoSearch/src/js/l.geosearch.provider.google.js"></script>
<link rel="stylesheet" href="../leaflet-0.5/plugins/L.GeoSearch/src/css/l.geosearch.css" />

<!-- locate control -->
<link rel="stylesheet" href="../leaflet-0.5/plugins/L.Control.Locate.ie.css" />
<link rel="stylesheet" href="../leaflet-0.5/plugins/L.Control.Locate.css" />
<script src="../leaflet-0.5/plugins/L.Control.Locate.js"></script>


<script src="http://maps.google.com/maps/api/js?v=3.5&amp;sensor=false"></script>
<style type="text/css">
#map { height: 480px; }
</style>


<div id="map" class="map"></div>

	<!-- carica la mappa -->

	<script src="./js/mappa.js"></script>
	<script type="text/javascript">attiva_coordinate();</script>
