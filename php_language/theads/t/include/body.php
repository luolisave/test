<main class="container">

    <!-- replies -->
    <?php 
    $cats = array();
    
    foreach ($threadIndex["replies"] as $key => $value){ 
        if(!empty($value["cat"])){
            array_push($cats, $value["cat"]);
            $cats = array_unique($cats, SORT_REGULAR);
        }
        
        
    ?>
    <div class="row" style="<?php if(!empty($_GET['edit']) && $_GET['edit'] == "topic"){if($key != 0){echo "display:none";}}else if(!empty($_GET['edit']) && $_GET['edit'] != $key){echo "display:none";} ?>">
        <div class="col-xs-12 th_box">
            <div class="th_box_div">
                <?php if($key > 0){ ?>
                <div style="float:left; width:128px; min-height: 128px; margin-right:8px; background-color:#FBB; border-radius: 8px; overflow:hidden;">
                    <div >
                        <img style="margin-left:16px;margin-top:8px;" height="64" width="64" src="icon.png">
                        <div style="float:right; padding-right:4px"><b><?php echo '#'.$key; ?></b></div>
                    </div>
                    <div style="text-align:center;">
                        <span style="cursor:pointer;margin-left:4px" title="<?php if(!empty($value["nickname"]))echo $value["nickname"]; ?>"><?php if(!empty($value["nickname"]))echo $value["nickname"]; ?></span>
                    </div>
                    <div style="text-align:center;">
                        <a href="mailto:<?php if(!empty($value["email"]))echo $value["email"]; ?>">
                            <span style="cursor:pointer;margin-left:4px;font-size:12px;" title="<?php if(!empty($value["email"]))echo $value["email"]; ?>"><?php if(!empty($value["email"]))echo $value["email"]; ?></span>
                        </a>
                    </div>
                    <div style="text-align:center;">
                        <span style="cursor:pointer;margin-left:4px;font-size:12px;" title="<?php if(!empty($value["datetime"]))echo $value["datetime"]; ?>"><?php if(!empty($value["datetime"]))echo $value["datetime"]; ?></span>
                    </div>
                </div>
                <?php } ?>
                
                <div>
                <?php if(!empty($value["title"])){ ?>
                    <?php if($key == 0){ ?>
                    <h1><?php echo $value["title"]; ?></h1>
                    <?php }else{ ?>
                    <h3><?php echo $value["title"]; ?></h3>
                    <?php } ?>
                <?php } ?>
                
                <?php 
                    if(empty($value["file"])){
                        echo $value["summary"]; 
                    }else{
                        //echo " -- should put file content here. -- ";
                        $threadThread = json_decode(file_get_contents("storage/".$hash."/".$value["file"]),true);
                        if(!empty($threadThread["data"]["content"])){
                            echo $threadThread["data"]["content"];
                        }
                    }
                ?>
                </div>
            </div>
        </div>
    </div>
    <?php 
    } 
    
    ?>
    
    <script type="text/javascript">
        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
        
        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
        
        function recordCookies(){
            var nickname = $("form[name=replyForm] input[name=nickname]").val();
            var email = $("form[name=replyForm] input[name=email]").val();
            var tag = $("form[name=replyForm] input[name=tag]").val();
            
            setCookie("th_nickname", nickname, 365);
            setCookie("th_email", email, 365);
            setCookie("th_tag", tag, 365);
            
            return true;
        }
        
        $(document).ready(function(){
            var nickname = getCookie("th_nickname");
            var email = getCookie("th_email");
            var tag = getCookie("th_tag");
            
            $("form[name=replyForm] input[name=nickname]").val(nickname);
            $("form[name=replyForm] input[name=email]").val(email);
            $("form[name=replyForm] input[name=tag]").val(tag);
        });
    </script>
    
    
    <form method="post" name="replyForm" action="reply.php<?php $tid = empty($_GET['tid'])?'':trim($_GET['tid']); echo empty($tid)?'':'?tid='.$tid; ?><?php echo empty($_GET['edit'])?'':'&edit='.$_GET['edit']; ?>" onsubmit="return recordCookies()">
        <input class="form-control" type="hidden" name="replyThread" value="replyThread" />
        <input class="form-control" type="hidden" name="siteUrlFull" value="<?php echo SITE_URL_FULL; ?>" />
        
        <div class="row">
            <div class="col-xs-12 th_box">
                <div class="th_reply_box_div">
                    <?php 
                    if(!empty($_GET['edit'])){
                        if($_GET['edit'] == "topic"){
                            $editNumber = 0;
                        }else{
                            $editNumber = intval($_GET['edit']);
                        }
                        
                        $v = $threadIndex["replies"][$editNumber];
                        if(empty($v["file"])){
                            echo $v["summary"]; 
                        }else{
                            $threadThread = json_decode(file_get_contents("storage/".$hash."/".$v["file"]),true);
                        }
                    }
                    ?>
                    <table style="width:100%">
                        <tr>
                            <td>
                                <input class="form-control" name="nickname" placeholder="Nick Name" />
                            </td>
                            <td>
                                <input class="form-control" name="email" placeholder="E-mail" />
                            </td>
                            <td>
                                <input class="form-control" name="cat" placeholder="Category" />
                                <?php /* ?>
                                <select id="selectCat" class="form-control" name="cat">
                                    <?php 
                                    foreach($cats as $k => $cat){ 
                                    ?>
                                    <option value="<?php echo $cat; ?>"><?php echo $cat; ?></option>
                                    <?php } ?>
                                    <option value="" selected="selected">Category</option>
                                    <option value="other">Other</option>
                                </select>
                                <?php //*/ ?>
                            </td>
                            <td>
                                
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                
                                <input class="form-control" name="title" placeholder="Title" value="<?php 
                                    if(!empty($_GET['edit']) && !empty($v["title"])){
                                        echo $v["title"];
                                    }
                                ?>" />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <textarea style="height:180px;" class="form-control" name="content" id="replyArea"><?php 
                                if(!empty($_GET['edit']) && !empty($threadThread["data"]["content"])){
                                    echo $threadThread["data"]["content"];
                                }
                                ?></textarea>
                            </td>
                        </tr>
                    </table>
                    <div>&nbsp;</div>
                    <input class="btn btn-primary" type="submit" value="Submit">
                </div>
            </div>
        </div>
    </form>
    
    <script type="text/javascript">
        $(document).ready(function(){
            //tinymce.init({ selector:'textarea' });
            //----------------------
            tinymce.init({
                selector:'textarea',
                theme: "modern",
                plugins: [
                    "advlist autolink lists link image charmap print preview hr anchor pagebreak",
                    "searchreplace wordcount visualblocks visualchars code fullscreen",
                    "insertdatetime media nonbreaking save table contextmenu directionality",
                    "emoticons template paste textcolor colorpicker textpattern imagetools"
                ],
                menubar: '',
                toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
                toolbar2: "print preview media | link image | forecolor backcolor emoticons",
                image_advtab: true,
                paste_data_images: true,
                templates: [
                    {title: 'Test template 1', content: 'Test 1'},
                    {title: 'Test template 2', content: 'Test 2'}
                ]
            });
            
            // menubar: 'file edit insert view format table tools',
            //------------------
        });
    </script>
    
</main>