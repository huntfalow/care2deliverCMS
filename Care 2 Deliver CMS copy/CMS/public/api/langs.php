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
    if (count($params)<1){
        respondWithAllLangs($conn);
    }else if(count($params)===1){
        $id=$params[0];
        if (is_numeric($id)){
            respondLangById($conn,$id);
        }else{
            echo json_encode(array("NotNumeric"=>true));
        }
    }else{
        echo json_encode(array("UnknownAmountOfParameters"=>true));
    }
}
function handlePost($params,$conn){
    $request=jsonRequestToArray();
    addLang($conn,$request);
}
function handlePut($params,$conn){
        $request=jsonRequestToArray();
    editLang($conn,$request);
}
function handleDelete($params,$conn){
     if(count($params)===1){
        $id=$params[0];
        if (is_numeric($id)){
            deleteLang($conn,$id);
        }else{
            echo json_encode(array("NotNumeric"=>true));
        }
    }else{
        echo json_encode(array("UnknownAmountOfParameters"=>true));
    }
}