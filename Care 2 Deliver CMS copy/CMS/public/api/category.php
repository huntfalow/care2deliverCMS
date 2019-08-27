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
    //select
    if (count($params)<1){
        respondWithAllCategories($conn);
    }else if(count($params)===1){
        $id=$params[0];
        if (is_numeric($id)){
            respondCategoryById($conn,$id);
        }else{
            echo json_encode(array("NotNumeric"=>true));
        }
    }else{
        echo json_encode(array("UnknownAmountOfParameters"=>true));
    }
}
function handlePost($params,$conn){
    //insert
    $request=jsonRequestToArray();

    addCategory($conn,$request);

}
function handlePut($params,$conn){
    //update
    $request=jsonRequestToArray();

    echo json_encode(editCategory($conn,$request));

}
function handleDelete($params,$conn){
    //delete
    if(count($params)===1){
        $id=$params[0];
        if (is_numeric($id)){
            deleteCategory($conn,$id);
        }else{
            echo json_encode(array("NotNumeric"=>true));
        }
    }else{
        echo json_encode(array("UnknownAmountOfParameters"=>true));
    }
}
