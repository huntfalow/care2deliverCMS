<?php
require_once "setup.php";
switch ($method) {
    case "GET":
        handleGet($params,$conn);
        break;
    case "POST":
        handlePost($params,$conn);
        break;
    case "PUT":
        handlePut($params,$conn);
        break;
    case "DELETE":
        handleDelete($params,$conn);
        break;
}

function handleGet($params,$conn){
    respondWithDefaultLang($conn);
}

function handlePut($params,$conn){
 if (count($params)<1){
      echo json_encode(array("UnknownAmountOfParameters"=>true));
    }else if(count($params)===1){
        $id=$params[0];
        if (is_numeric($id)){
            setDefaultLangById($conn,$id);
        }else{
            echo json_encode(array("NotNumeric"=>true));
        }
    }else{
        echo json_encode(array("UnknownAmountOfParameters"=>true));
    }
}
