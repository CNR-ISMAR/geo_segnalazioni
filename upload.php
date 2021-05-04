<!DOCTYPE html>
<html>
<body>
<?php

include('password.inc');
if(isset($_POST['submit'])){
$pwd=$_POST['password'];
$target_dir = "./";
$target_file = "segnalazioni.csv";
unlink("segnalazioni.csv");
$uploadOk = 1;
$FileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
  $fileTmpLoc = $_FILES["fileToUpload"]["tmp_name"];
  $check = mime_content_type($fileTmpLoc);
  if($check == 'text/csv' or $check== 'text/plain') {
    if ($pwd != $storedpassword){
	echo "bad username or password";
    }
    echo "File is ok - " . $check . ".";
    move_uploaded_file($fileTmpLoc,$target_file);
    $uploadOk = 1;
  } else {
    echo $check." File is not a csv .";
    $uploadOk = 0;
  }

}
?>

<form action="upload.php" method="post" enctype="multipart/form-data">
  Set user and password:<br>
  <input type="text" name="username" id="usrname"><br>
  <input type="password" name="password" id="password"><br>
  Select file to upload:<br>
  <input type="file" name="fileToUpload" id="fileToUpload"><br>
  <input type="submit" value="Upload File" name="submit">
</form>


</body>
</html>





