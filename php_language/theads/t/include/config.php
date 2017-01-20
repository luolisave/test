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
$request_url = dirname($_SERVER['SCRIPT_NAME']); //$_SERVER['PHP_SELF']
if ($request_url == '/')
    $request_url = '';
if ($secure_connection == true) {
    $pre_site_url = "https://" . $pre_site_url . $current_port . $request_url;
} else {
    $pre_site_url = "http://" . $pre_site_url . $current_port . $request_url;
}


//
$threadTopic = json_decode(file_get_contents("storage/topic.json"),true);
$threadReplies = json_decode(file_get_contents("storage/replies.json"),true);