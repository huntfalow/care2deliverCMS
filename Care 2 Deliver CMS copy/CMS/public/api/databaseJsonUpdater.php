<?php
function initDatabaseJsonUpdater($conn){
    $generatedTables=getGeneratedTables($conn);
    $langs = getLangArray($conn);
    $string = file_get_contents("identityList.json");
    $identityList = json_decode($string, true);
    addAndDeleteDatabases($conn,$generatedTables,$langs,$identityList);
    //update because it might have changed
    $generatedTables=getGeneratedTables($conn);
    // handle changes to existing items in identitylist json   
    checkForChangesInModel($conn,$generatedTables,$langs,$identityList);
}
function addAndDeleteDatabases($conn,$generatedTables,$langs,$identityList){
    //check if creations have to happen and create
    foreach($identityList["data"] as $layout){
        $tableAlreadyGenerated=false;
        foreach($generatedTables["data"] as $generatedTable){
            if ($generatedTable["Identity"]==strtolower($layout["Identity"])){
                $tableAlreadyGenerated=true;
                
            }
        }
        if(!$tableAlreadyGenerated){
            generateTable($conn,strtolower($layout["Identity"]),$langs,$layout);
        }
    }
    //check if tables need to be deleted
     $tableIdentities=[];
    foreach($generatedTables["data"] as $generatedTable2){
        array_push($tableIdentities,strtolower($generatedTable2["Identity"]));
    }
    $layoutIdentities=[];
    foreach($identityList["data"] as $layout){
        array_push($layoutIdentities,strtolower($layout["Identity"]));
    }
   $diff=array_diff($tableIdentities,$layoutIdentities);
   foreach($diff as $identity){
        deleteTable($conn,strtolower($identity),$langs,$layout);
   }

}

function generateTable($conn,$identity,$langs,$layout){

    $sql = "CREATE TABLE ".$identity." (
langId INT(6) UNSIGNED PRIMARY KEY, 
json VARCHAR(50000) NOT NULL)";

if ($conn->query($sql) === TRUE) {
    $qry = "INSERT INTO `tblgeneratedtables` (`Identity`) VALUES (?);";
    $stmt= $conn->prepare($qry);
    $stmt->bind_param("s",$identity);
    $stmt->execute();
    fillNewTable($conn,$identity,$langs,$layout);
    
} else {
    echo "Error creating table: " . $conn->error;
}
}
function fillNewTable($conn,$identity,$langs,$layout){
    $jsonEncoded = json_encode($layout);
    foreach($langs["data"] as $lang){
        $langId=$lang["id"];
        $qry = "INSERT INTO `".strtolower($identity)."` (`langId`,`json`) VALUES (?,?);";
        $stmt= $conn->prepare($qry);
        $stmt->bind_param("is",$langId,$jsonEncoded);
        $stmt->execute();
    }
}
function deleteTable($conn,$identity,$langs,$layout){
    $qry = "DELETE FROM `tblgeneratedtables` WHERE `tblgeneratedtables`.`Identity` = ? LIMIT 1;";
    $stmt= $conn->prepare($qry);
    $stmt->bind_param("s",strtolower($identity));
    $stmt->execute();

    $qry="DROP TABLE ".$identity.";";
    $stmt= $conn->prepare($qry);
    $stmt->execute();

}


function checkForChangesInModel($conn,$generatedTables,$langs,$identityList){
    
    foreach($identityList["data"] as $layout){
        foreach($generatedTables["data"] as $generatedTable){
            if (strtolower($generatedTable["Identity"])==strtolower($layout["Identity"])){
                $qry = "SELECT * FROM  `".strtolower($layout["Identity"])."`";
                $stmt= $conn->prepare($qry);
                $langTexts= handleSelectQuery($stmt);
                foreach($langTexts["data"] as $langText){
                    $layoutOnDatabase=json_decode($langText["json"],true);
                    updateDatabaseLayoutAndAddVals($layoutOnDatabase,$layout,$langText["langId"],$conn);
                }
            }
        }
    }
}

function updateDatabaseLayoutAndAddVals($layoutToUpdate,$layout,$langId,$conn){
    $layoutToUpdate["ApiUrl"] = $layout["ApiUrl"];
    $layoutToUpdate["Title"] = $layout["Title"];
    $layoutToUpdate["Identity"] = $layout["Identity"];
    
     // haal lijst op van keys
    $keys=[];
    foreach($layoutToUpdate["GeneratedSections"] as $generatedSection){
        foreach($generatedSection["ValueKeys"] as $valueKey){
            array_push($keys,$valueKey);
        }
    }

    // plaats de layout in de layout to update
    $layoutToUpdate["GeneratedSections"] = $layout["GeneratedSections"];
     // plaats de juiste values bij de juiste keys
    foreach($layoutToUpdate["GeneratedSections"] as $sectionKey=>$generatedSection){
        foreach($generatedSection["ValueKeys"] as $valuekeyKey=>$valueKey){
            foreach($keys as $keyKey=>$key){
                if ($valueKey["Key"]==$key["Key"]){
                    $layoutToUpdate["GeneratedSections"][$sectionKey]["ValueKeys"][$valuekeyKey]["Value"]=$key["Value"];
                }
            }
        }
    }

    $qry="UPDATE `".strtolower($layoutToUpdate["Identity"])."` SET  `json` = ? WHERE  `langId` =?";
    $stmt= $conn->prepare($qry);
    $json=json_encode($layoutToUpdate);
    $stmt->bind_param("si",$json,$langId);
    $stmt->execute();
}

