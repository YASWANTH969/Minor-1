<?php
// database connection code
// $con = mysqli_connect('localhost', 'database_user', 'database_password','database');

$con = mysqli_connect('localhost', 'root', '','adnaan');

// get the post records
$Username = $_POST['Username'];
$Password = $_POST['Password'];

// database insert SQL code
$sql = "INSERT INTO name(`username`, `password`) VALUES ('$Username', '$Password')";

// insert in database 
$rs = mysqli_query($con, $sql);

if($rs)
{
	echo '<script>window.location.href = "file:///C:/xampp/htdocs/New%20code.html";</script>';
    exit;
}

?>