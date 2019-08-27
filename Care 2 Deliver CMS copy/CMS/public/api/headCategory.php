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
        respondWithAllHeadCategories($conn);
    }else if(count($params)===1){
        $id=$params[0];
        if (is_numeric($id)){
            respondHeadCategoryById($conn,$id);
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
    echo json_encode(array("notImplemented"=>true));
}
function handleDelete($params,$conn){
    echo json_encode(array("notImplemented"=>true));
}