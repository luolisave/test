<?php
include "include/config.php";

include 'include/header.php';


if($_POST){
    if(!empty($_POST["replyThread"])){
        if(!empty($_POST["replyThread"])){
           $replyContent = trim($_POST["content"]);
           
           $tmpContentLen = strlen($replyContent);
           //var_dump($tmpContentLen);
           if($tmpContentLen < 1000){ //TODO: use global constant.
               //record content into summary field if its not too long.
               $tmpArray = array(
                    "title" => empty($_POST["title"])?"":$_POST["title"],
                    "summary" => $replyContent,
                    "file"=>"",
                    "nickname"=>empty($_POST["nickname"])?"anonymous":$_POST["nickname"],
                    "email"=>empty($_POST["email"])?"anonymous@anonymous.com":$_POST["email"],
                    "cat"=>empty($_POST["cat"])?"":$_POST["cat"],
                    "tag"=>empty($_POST["tag"])?"":$_POST["tag"],
                    "datetime"=>date("Y-m-d H:i:s"),
                    "status"=>"active"
               );
           }else{
               //record content into meta file.
               //todo, change the file name to thread # // $threadIndex["replies"]
               if(!empty($_GET["edit"])){
                   $metaJsonFileName = trim($_GET["edit"]) . ".json"; 
               }else{
                   $metaJsonFileName = count($threadIndex["replies"]) . ".json";
               }
               
               $tmpArray = array(
                    "title" => empty($_POST["title"])?"":$_POST["title"],
                    "summary" => "",
                    "file"=>$metaJsonFileName,
                    "nickname"=>empty($_POST["nickname"])?"anonymous":$_POST["nickname"],
                    "email"=>empty($_POST["email"])?"anonymous@anonymous.com":$_POST["email"],
                    "cat"=>empty($_POST["cat"])?"":$_POST["cat"],
                    "tag"=>empty($_POST["tag"])?"":$_POST["tag"],
                    "datetime"=>date("Y-m-d H:i:s"),
                    "status"=>"active"
               );
               $tmpMetaFileArray = array(
                        "data" => array(
                                "content"=>$replyContent,
                                "datetime"=>date("Y-m-d H:i:s")
                            ),
                        "admin" => array()
                   );
               $metaJsonFileStr = json_encode($tmpMetaFileArray);
               file_put_contents("storage/".$hash."/".$metaJsonFileName,$metaJsonFileStr);
           }
           
            if(!empty($_GET["edit"])){
                if($_GET["edit"] == "topic"){
                    $editNum = 0;
                }else{
                    $editNum = intval($_GET["edit"]);
                }
                $threadIndex["replies"][$editNum] = $tmpArray;
            }else{
                array_push($threadIndex["replies"], $tmpArray);
            }
            
            $jsonStr = json_encode($threadIndex);
            file_put_contents("storage/".$hash."/index.json",$jsonStr);
            
            //redirect back
            //header('Location: ' . SITE_URL);
        }
    }
    //exit();
}

?>

<main>
    <div style="text-align:center;padding-top: 100px;">
        <h2><a class="btn btn-primary" href="<?php echo empty($_POST['siteUrlFull'])?"":$_POST['siteUrlFull']; ?>">Done and Return</a></h2>
        <!--<p><?php var_dump($_POST); ?></p>-->
    </div>
</main>

<?php
include 'include/footer.php';

