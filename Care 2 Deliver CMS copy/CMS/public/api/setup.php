<?php
header('Content-Type: application/json');

//db conn open
$conn = new mysqli("ID217387_care2deliver.db.webhosting.be","ID217387_care2deliver", "falconaccesonly1" , "ID217387_care2deliver");
if ($conn->connect_errno) {
    echo json_encode(array("dbConnectionFail"=>true));
    exit();
}
require_once "commonFunctions.php";
require_once "functions.php";
// getting request data
$method = $_SERVER['REQUEST_METHOD'];
$params = getRequestParams();
