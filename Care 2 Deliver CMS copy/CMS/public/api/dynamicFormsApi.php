<?php
require_once "setup.php";
require_once "databaseJsonUpdater.php";
initDatabaseJsonUpdater($conn);
switch ($method) {
    case "GET":
        handleGet($params,$conn);
        break;
    case "PUT":
        handlePut($params,$conn);
        break;
    
}

function handleGet($params,$conn){
    //select
    if (count($params)<1){
        echo json_encode(array("1 parameter is required"=>true));
    }else if(count($params)===1){
        $identity=$params[0];
         echo json_encode( array("data"=>getIdentityLangTexts($conn,strtolower($identity))));
    }else{
        echo json_encode(array("UnknownAmountOfParameters"=>true));
    }
}

function handlePut($params,$conn){
    //update
    $request=jsonRequestToArray();

     if (count($params)<1){
        echo json_encode(array("1 parameter is required"=>true));
    }else if(count($params)===1){
        $identity=$params[0];
        echo json_encode( array("data"=>updateDyamicForms($conn,$request,strtolower($identity))));
    }else{
        echo json_encode(array("UnknownAmountOfParameters"=>true));
    }

}

