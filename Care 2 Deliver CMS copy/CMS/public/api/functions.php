<?php


function respondWithAllHeadCategories($conn){
    $qry = "SELECT * FROM  `tblheadcategory` ";
    $stmt= $conn->prepare($qry);
    echo json_encode(handleSelectQuery($stmt));
}
function respondHeadCategoryById($conn,$id){

    $qry = "SELECT * FROM  `tblheadcategory` WHERE id=? LIMIT 1";
    $stmt= $conn->prepare($qry);
    $stmt->bind_param("i",$id);
    echo json_encode(handleSelectQuery($stmt));
}
function respondWithAllLangText($conn){
    $qry = "SELECT * FROM  `tbllangtext` ";
    $stmt= $conn->prepare($qry);
    echo json_encode(handleSelectQuery($stmt));
}

function respondLangTextById($conn,$langId,$catId){
    $qry = "SELECT * FROM  `tbllangtext` WHERE langId=? AND categoryId=? LIMIT 1";
    $stmt= $conn->prepare($qry);
    $stmt->bind_param("ii",$langId,$catId);
    echo json_encode(handleSelectQuery($stmt));
}
function respondLangTextByCatId($conn,$catId){
    $qry = "SELECT * FROM  `tbllangtext` WHERE categoryId=?";
    $stmt= $conn->prepare($qry);
    $stmt->bind_param("i",$catId);
    echo json_encode(handleSelectQuery($stmt));
}
function respondWithAllLangs($conn){
    $qry = "SELECT * FROM  `tbllangs` ";
    $stmt= $conn->prepare($qry);
    echo json_encode(handleSelectQuery($stmt));
}
function respondWithDefaultLang($conn){
    $qry = "SELECT * FROM  `tbllangs` WHERE  `defaultLang` =1 limit 1";
    $stmt= $conn->prepare($qry);
    echo json_encode(handleSelectQuery($stmt));
}
function setDefaultLangById($conn,$id){
  $qry="UPDATE  `tbllangs` SET  `defaultLang` =  '0';";
  $stmt= $conn->prepare($qry);
  $stmt->execute();
    $qry="UPDATE  `tbllangs` SET  `defaultLang` =  '1' WHERE  `tbllangs`.`id` =?;";
  $stmt= $conn->prepare($qry);
  $stmt->bind_param("i",$id);
  $stmt->execute();
  respondWithDefaultLang($conn);
}
function respondLangById($conn,$id){

    $qry = "SELECT * FROM  `tbllangs` WHERE id=? LIMIT 1";
    $stmt= $conn->prepare($qry);
    $stmt->bind_param("i",$id);
    echo json_encode(handleSelectQuery($stmt));
}
function getLangArray($conn){
    $qry = "SELECT * FROM  `tbllangs` ";
    $stmt= $conn->prepare($qry);
    return handleSelectQuery($stmt);
}
function respondWithAllCategories($conn){
    $qry = "SELECT * FROM  `tblcategory` ";
    $stmt= $conn->prepare($qry);
    echo json_encode(handleSelectQuery($stmt));
}
function respondCategoryById($conn,$id){

    $qry = "SELECT * FROM  `tblcategory` WHERE id=? LIMIT 1";
    $stmt= $conn->prepare($qry);
    $stmt->bind_param("i",$id);
    echo json_encode(handleSelectQuery($stmt));
}
function addCategory($conn,$requestData){
    $qry = "INSERT INTO  `tblcategory` (`headCategoryId` ,`name` ,`faName`)VALUES (?,  ?,  ?);";
    $stmt= $conn->prepare($qry);
    $stmt->bind_param("iss",$requestData->headCatId,$requestData->name,$requestData->faName);
    $stmt->execute();
    $catId = $stmt->insert_id;
    // for each lang
    $langs = getLangArray($conn);
    foreach ($langs['data'] as $lang){
        addEmptyLangText($conn,$lang['id'],$catId);
    }
    // get cat to return
    respondCategoryById($conn,$catId);


}
function editCategory($conn,$requestData){
  $qry="UPDATE  `tblcategory` SET  `headCategoryId` =  ?,`name` =  ?,`faName` =  ? WHERE  `tblcategory`.`id` =?;";
  $stmt= $conn->prepare($qry);
  $stmt->bind_param("issi",$requestData->headCatId,$requestData->name,$requestData->faName,$requestData->id);
  $stmt->execute();
    return  array("data"=>$requestData);
}
function addEmptyLangText($conn,$langId,$catId){
    $defaultText="";
    $qry = "INSERT INTO  `tbllangtext` (`langId` ,`categoryId` , `titel` , `text`)VALUES (?,  ?,  ?,  ?);";
    $stmt= $conn->prepare($qry);
    $stmt->bind_param("iiss",$langId,$catId,$defaultText,$defaultText);
    $stmt->execute();
}
function deleteCategory($conn,$id){
    $qry = "DELETE FROM `tblcategory` WHERE `tblcategory`.`id` = ? LIMIT 1;";
    $stmt= $conn->prepare($qry);
    $stmt->bind_param("i",$id);
    $stmt->execute();
    deleteLangTextByCatId($conn,$id);
    return json_encode(array("rowsAffected"=>$conn->affected_rows));
}
function deleteLangTextByCatId($conn,$id){
    $qry="DELETE FROM `tbllangtext` WHERE `tbllangtext`.`categoryId` = ? ";
    $stmt= $conn->prepare($qry);
    $stmt->bind_param("i",$id);
    $stmt->execute();
}
function deleteLangTextByLangId($conn,$id){
    $qry="DELETE FROM `tbllangtext` WHERE `tbllangtext`.`langId` = ? ";
    $stmt= $conn->prepare($qry);
    $stmt->bind_param("i",$id);
    $stmt->execute();
}
function editLangText($conn,$requestData){
  $qry="UPDATE  `tbllangtext` SET  `titel` =  ?,`text` =  ? WHERE  `tbllangtext`.`langId` = ? AND  `tbllangtext`.`categoryId` =?;";
  $stmt= $conn->prepare($qry);
  $stmt->bind_param("ssii",$requestData->titel,$requestData->text,$requestData->langId,$requestData->categoryId);
  $stmt->execute();
    return  array("data"=>$requestData);
}
function getCategoryArray($conn){
        $qry = "SELECT * FROM  `tblcategory` ";
    $stmt= $conn->prepare($qry);
    return handleSelectQuery($stmt);
}
function addLang($conn,$requestData){
    $qry = "INSERT INTO `tbllangs` (`id`, `langName`, `tag`) VALUES (NULL, ?, ?);";
    $stmt= $conn->prepare($qry);
    $stmt->bind_param("ss",$requestData->langName,$requestData->tag);
    $stmt->execute();
    $langId = $stmt->insert_id;
    addLangToAllLangTexts($conn,$langId);

}
function addLangToAllLangTexts($conn,$langId){
addLangToCategoriesLangText($conn,$langId);
// plaats hier alle ander langtexts generators die nodig zijn
}
function addLangToCategoriesLangText($conn,$langId){
    $allCats=getCategoryArray($conn);
    foreach($allCats["data"] as $cat){
        addEmptyLangText($conn,$langId,$cat["id"]);
    }
    upadateGeneratedTablesForAddLang($langId,$conn);
    respondLangById($conn,$langId);
}
function editLang($conn,$requestData){
    $qry = "UPDATE  `tbllangs` SET  `langName` =  ?,`tag` =  ? WHERE  `tbllangs`.`id` =?;";
    $stmt= $conn->prepare($qry);
    $stmt->bind_param("ssi",$requestData->langName,$requestData->tag,$requestData->id);
    $stmt->execute();
    respondLangById($conn,$requestData->id);
}
function deleteLang($conn,$id){
    $qry = "DELETE FROM `tbllangs` WHERE `tbllangs`.`id` = ? LIMIT 1;";
    $stmt= $conn->prepare($qry);
    $stmt->bind_param("i",$id);
    $stmt->execute();
    deleteLangTextByLangId($conn,$id);
    updateGeneratedTablesForDeleteLang($id,$conn);
    return json_encode(array("rowsAffected"=>$conn->affected_rows));
}
function getGeneratedTables($conn){
    $qry = "SELECT * FROM  `tblgeneratedtables` ";
    $stmt= $conn->prepare($qry);
    return handleSelectQuery($stmt);
}
function updateGeneratedTablesForDeleteLang($id,$conn){
    $generatedTables= getGeneratedTables($conn);
    foreach($generatedTables["data"] as $generatedTable){
    $qry = "DELETE FROM `".$generatedTable["Identity"]."` WHERE `langId` = ? LIMIT 1;";
    $stmt= $conn->prepare($qry);
    $stmt->bind_param("i",$id);
    $stmt->execute();
    }
}
function upadateGeneratedTablesForAddLang($id,$conn){
    $generatedTables= getGeneratedTables($conn);
    $string = file_get_contents("identityList.json");
    $identityList = json_decode($string, true);

    foreach($generatedTables["data"] as $generatedTable){
        $json;
        foreach($identityList["data"] as $identity){
            if ($identity["Identity"]==$generatedTable["Identity"]){
                $json = json_encode($identity);
            }
        }
        $qry =  $qry = "INSERT INTO `".$generatedTable["Identity"]."` (`langId`, `json`) VALUES (?, ?);";
        $stmt= $conn->prepare($qry);
        $stmt->bind_param("is",$id,$json);
        $stmt->execute();
    }
}
function getIdentityLangTexts($conn,$identity){
    $qry = "SELECT * FROM  `".$identity."`";
    $stmt= $conn->prepare($qry);
    $identitLangTexts=handleSelectQuery($stmt);
    $identitLangTextsReformated=[];
    foreach($identitLangTexts["data"] as $identitLangText){
        $reformated = ["LangId"=>$identitLangText["langId"],"PageLayout"=>json_decode($identitLangText["json"])];
        array_push($identitLangTextsReformated,$reformated);
    }
    return $identitLangTextsReformated;

}
function updateDyamicForms($conn,$request,$identity){
    foreach($request as $langPageLayout){
    $qry = "UPDATE  `".$identity."` SET  `json` = ? WHERE `langId` =?;";
    $stmt= $conn->prepare($qry);
    $jsonEncoded=json_encode($langPageLayout->PageLayout);
    $stmt->bind_param("si",$jsonEncoded,$langPageLayout->LangId);
    $stmt->execute();

    }
        return getIdentityLangTexts($conn,$identity);
}
