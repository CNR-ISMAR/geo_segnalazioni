<?php

<?php
if(isset($_POST['submit'])){

    //collect form data
    $name = $_POST['name'];
    $email = $_POST['email'];

    //check name is set
    if($name ==''){
        $error[] = 'Name is required';
    }

    //check for a valid email address
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
         $error[] = 'Please enter a valid email address';
    }

    //if no errors carry on
    if(!isset($error)){

        $fp = fopen("segnalazioni.csv", "a");
        $savestring = $name . "," . $email . "," . $lat . "," . $lon . "n";
        fwrite($fp, $savestring);
        fclose($fp);
        echo "<h1>You data has been saved in a text file!</h1>";

}else{
        
   include('map.php');

//if their are errors display them
if(isset($error)){
    foreach($error as $error){
        echo "<p style='color:#ff0000'>$error</p>";
    }
}
?> 


<form action='' method='post'>
<p><label>Lat</label><br><input type='text' name='longitude' value=''></p> 
<p><label>Longitude</label><br><input type='text' name='longitude' value=''></p>     
<p><label>Name</label><br><input type='text' name='name' value=''></p> 
<p><label>Email</label><br><input type='text' name='email' value=''></p> 
<p><input type='submit' name='submit' value='Submit'></p> 
</form>


?>
