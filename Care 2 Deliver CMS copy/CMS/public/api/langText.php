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
    if (count($params)===0){
        respondWithAllLangText($conn);
    }else if(count($params)===2){
        $catid=$params[0];
        $langid=$params[1];
        if (is_numeric($langid) and is_numeric($catid)){
            respondLangTextById($conn,$langid,$catid);
        }else{
            echo json_encode(array("NotNumeric"=>true));
        }
    }else if(count($params)===1){
        $catid=$params[0];
        if (is_numeric($catid)){
            respondLangTextByCatId($conn,$catid);
        }else{
            echo json_encode(array("NotNumeric"=>true));
        }
    }else{
        echo json_encode(array("UnknownAmountOfParameters"=>true));
    }
}
function handlePost($params,$conn){
    echo json_encode(array("notImplemented"=>true));
}
function handlePut($params,$conn){
    $request=jsonRequestToArray();
    echo json_encode(editLangText($conn,$request));
}
function handleDelete($params,$conn)
{
    echo json_encode(array("notImplemented" => true));
}
