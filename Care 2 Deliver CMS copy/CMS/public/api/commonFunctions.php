<?php
/**
 * Created by PhpStorm.
 * User: brech
 * Date: 19/03/2017
 * Time: 0:24
 */
function getRequestParams(){
    $fullPath = removeTrailingSlash($_SERVER['REQUEST_URI']);
    $filePath = $_SERVER['SCRIPT_NAME'];

    if ($fullPath === $filePath){
        return array();
    }else{
        $paramString = substr($fullPath, strlen($filePath) + 1 , strlen($fullPath) - strlen($filePath) -1 );

        $params = explode("/", $paramString);
        return $params;
    }


}

function removeTrailingSlash($inputString){
    if (substr($inputString, -1)==="/"){
        return substr($inputString , 0 , strlen($inputString) -1);
    }else{
        return $inputString;
    }
}
function handleSelectQuery($stmt){
    $response = array();
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        array_push($response,$row);
    }
    return  array("data"=>$response);
}
function jsonRequestToArray(){
    $jsonString = file_get_contents("php://input");
    return json_decode($jsonString);
}