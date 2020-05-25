<html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <meta name="description" content="" />
       <meta name="author" content="" />
<link data-require="bootstrap-css" data-semver="3.3.5" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.css" />

<style>
  body {
      margin: 0;
  }

  html, body, #map {
      height: 100%;
  }
  button.btn-settings {
    margin: 25px;
    padding: 20px 30px;
    font-size: 1.2em;
    background-color: #337ab7;
    color: white;
  }
  button.btn-settings:active {
    color: white;
  }
  .modal {
      overflow: hidden;
  }
  .modal-dialog {
      margin-right: 0;
      margin-left: 0;
  }
  .modal-header {
    height:30px;
    padding: 20px;
    background-color:#18456b;
    color:white;
  }
  .modal-title {
    margin-top:-10px;
    font-size:16px;
  }
  .modal-header .close {
    margin-top:-10px;
    color:#fff;
  }
  .modal-body {
    color:#888;
    padding: 5px 35px 20px;
  }
  .modal-body h3 {
    text-align: center;
  }
  .modal-body p {
    padding-top:10px;
    font-size: 1.1em;
  }
</style>


<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""/>
  <script data-require="jquery" data-semver="2.1.4" src="https://code.jquery.com/jquery-2.1.4.js"></script>
<script data-require="jquery-ui" data-semver="1.12.1" src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<script data-require="bootstrap" data-semver="3.3.5" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>



<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
  integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
  crossorigin=""></script>


    
    
 <!-- Load Omnivore plugin to convert CSV to GeoJSON format -->
 <script src='https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-omnivore/v0.3.1/leaflet-omnivore.min.js'></script>

<script>        
$( document ).ready(function() {
    var modalDiv = $('#mymodal');
      modalDiv.modal({backdrop: false, show: false});
      $('.modal-dialog').draggable({
        handle: ".modal-header"
      });
});
</script>

    </head>
    <body>
<?php
if(isset($_POST['submit'])){

    //collect form data
    $name = $_POST['name'];
    $descrizione = $_POST['descrizione'];
    $lat = $_POST['latitude'];
    $lon = $_POST['longitude'];

    //check name is set
    if($name ==''){
        $error[] = 'Name is required';
    }

    //check for a valid email address
    // if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
    //      $error[] = 'Please enter a valid email address';
    // }

    //if no errors carry on
    if(!isset($error)){

        $fp = fopen("segnalazioni.csv", "a");
        $savestring = array($name, $descrizione,$lat ,$lon);
        fputcsv ($fp, $savestring);
        fclose($fp);
        echo "Grazie per la tua segnalazione!<br>";
        echo "<a href='/pinna'>Ricarica</a>";
      }
}else{



//if their are errors display them
if(isset($error)){
    foreach($error as $error){
        echo "<p style='color:#ff0000'>$error</p>";
    }
}
?>
  <div class="col-md-12" id="map"></div>
   <script src="./js/mappa.js"></script>

   <div id="mymodal" class="modal fade" tabindex="-1" role="dialog">
     <div class="modal-dialog">
       <div class="modal-content">
         <div class="modal-header">
           <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
           <h4 class="modal-title">Inserisci una segnalazione</h4>
         </div>
         <div class="modal-body">
           <form action='' method='post'>
            <p><label>Coordinate:</label>
           <input type="text" readonly class="form-control-plaintext" id='lon' name='longitude' value=''>
           <input type="text" readonly class="form-control-plaintext" id='lat' name='latitude' value=''>
           <p>
           <p><label>Nome</label><br>
             <input class="form-control" type='text' name='name' value=''></p>
           <p><label>Descrizione</label><br>
             <textarea class="form-control" id="desc" name='descrizione' rows="3"></textarea>
           <p><input type='submit' name='submit' value='Submit'></p>
           </form>
         </div>
         <div class="modal-footer">
           <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
           <button type="button" class="btn btn-primary">Confirm</button>
         </div>
       </div><!-- /.modal-content -->
     </div><!-- /.modal-dialog -->
   </div><!-- /.modal -->

<? } ?>


    </body>
    </html>
