<?php
require_once "setup.php";
$string = file_get_contents("identityList.json");
$identityList = json_decode($string, true);

switch ($method) {
    case "GET":
        handleGet($params,$identityList);
        break;
}

function handleGet($params,$identityList){
    if (count($params)<1){
        echo json_encode(array("noParameter"=>true));
    }else if(count($params)===1){
        $identity=$params[0];
        foreach($identityList["data"] as $layout){
            $found=false;
            if (strtolower($layout["Identity"])==strtolower($identity)){
               echo json_encode(array("data"=>$layout));
               $found=true;
            }

        }
    }else{
        echo json_encode(array("UnknownAmountOfParameters"=>true));
    }
}