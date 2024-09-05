<?php
// database connection code
// $con = mysqli_connect('localhost', 'database_user', 'database_password','database');
$con = mysqli_connect('localhost', 'root', '','form');
// get the post records
$Username = $_POST['Username'];
$Password = $_POST['Password'];
$Age = $_POST['Age'];
$date = $_POST['date'];
$gender = $_POST['gender'];
$number = $_POST['number'];
$Email = $_POST['Email'];
$Address = $_POST['Address'];
$HNO = $_POST['HNO'];
$City = $_POST['City'];
$Region = $_POST['Region'];
$text = $_POST['text'];
$Country = $_POST['Country'];
// database insert SQL code
$sql = "INSERT INTO `id`(`Username`, `Password`, `Age`, `date`, `gender`, `number`, `Email`, `Address`, `HNO`, `City`, `Region`, `text`, `Country`) VALUES ('$Username','$Password','$Age','$date','$gender','$number','$Email','$Address','$HNO','$City','$Region','$text','$Country')";
// insert in database 
$rs = mysqli_query($con, $sql);
if($rs)
{
	echo '<script>window.location.href = "index2.html";</script>';
    exit;
}
?>