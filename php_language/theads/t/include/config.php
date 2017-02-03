<?php
/*
 * PHP Single Thread Forum
 * @author: Jack Luo
 * @date: 2017/01/20
 */

//Debug: output error for debug
error_reporting(-1);
ini_set('display_errors', 'On');

//Project name and version
define("PROJ_NAME", 'PHP Single Thread Forum');
define("VERSION", '0.0.1');

/*
 * SECTION 0: Pre-Define
 */
// 0.1 Start session
session_start();

// 0.2 Setup timezone
date_default_timezone_set('America/Toronto');

// 0.3 set current url as default SITE_URL
if (empty($_SERVER['SERVER_PORT']) || $_SERVER['SERVER_PORT'] == 80 || $_SERVER['SERVER_PORT'] == 443) {
    $current_port = '';
} else {
    $current_port = ':' . $_SERVER['SERVER_PORT'];
}

$pre_site_url = empty($_SERVER['SERVER_NAME'])?'':$_SERVER['SERVER_NAME']; 
$secure_connection = false;
if (isset($_SERVER['HTTPS'])) {
    if ($_SERVER["HTTPS"] == "on") {
        $secure_connection = true;
    }
}
if(isset($_SERVER["HTTP_X_FORWARDED_PROTO"])){
    if ($_SERVER["HTTP_X_FORWARDED_PROTO"] == "https"){
        $secure_connection = true;
    }
}

$request_url = dirname($_SERVER['SCRIPT_NAME']); //$_SERVER['PHP_SELF']
if ($request_url == '/')
    $request_url = '';
if ($secure_connection == true) {
    $pre_site_url = "https://" . $pre_site_url . $current_port . $request_url;
} else {
    $pre_site_url = "http://" . $pre_site_url . $current_port . $request_url;
}
define("SITE_URL", $pre_site_url); 
define("SITE_URL_FULL", $pre_site_url."?".$_SERVER['QUERY_STRING']);





$hash = empty($_GET['tid'])?"default":md5($_GET['tid']);



// function: read config.json
function getThreadConfig(){
    $hash = empty($_GET['tid'])?"default":md5($_GET['tid']);
    $jsonConfigFileName = "storage/".$hash."/config.json";
    $jsonConfig = array();
    if (file_exists($jsonConfigFileName)) {
        $jsonConfig = json_decode(file_get_contents($jsonConfigFileName),true);
        return $jsonConfig;
    }else{
        return false;
    }
}

// function: check password
function checkPasscode($passcode){
    $threadConfig = getThreadConfig();
    if(!empty($threadConfig)){
        $passcode = empty($passcode)?"":trim($passcode);
        if($passcode != $threadConfig['passcode']){
            echo "!!!!! passcode not match! \n<br>";
            return false;
            //exit("passcode not match!");
        }else{
            return true;
        }
    }else{
        echo "!!!!! configure file config.json not found! \n<br>";
        return false;
        //exit("configure file config.json not found!");
    }
    
}

if(!empty($_GET['edit'])){
    $_GET['passcode']= empty($_GET['passcode'])?"":$_GET['passcode'];
    if(!checkPasscode($_GET['passcode'])){
        exit('passcode error!');
    }
}

// read index.json (create if not exist)
$jsonFolderName = "storage/".$hash;
$jsonIndexFileName = "storage/".$hash."/index.json";
if (file_exists($jsonIndexFileName)) {
    $threadIndex = json_decode(file_get_contents($jsonIndexFileName),true);
}else{
    if (!is_dir($jsonFolderName)) {
        mkdir($jsonFolderName);
    }
    
    file_put_contents($jsonIndexFileName,'{"replies":[]}');
    $threadIndex = json_decode(file_get_contents($jsonIndexFileName),true);
}

// if(!empty($_GET["method"])){
//     $method = trim($_GET["method"]);
// }
