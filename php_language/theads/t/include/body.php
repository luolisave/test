<main class="container">
    <!-- topic -->
    <div class="row">
        <div class="col-xs-12">
            <h1><?php if(!empty($threadTopic["data"]["title"])){echo $threadTopic["data"]["title"];} ?> </h1>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12 th_box">
            <div class="th_box_div">
                <?php 
                    if(!empty($threadTopic["data"]["content"])){echo $threadTopic["data"]["content"];}
                ?>
            </div>
        </div>
    </div>
    
    <!-- reply -->
    <?php foreach ($threadReplies["replies"] as $key => $value){ ?>
    <div class="row">
        <div class="col-xs-12 th_box">
            <div class="th_box_div">
                <?php 
                if(empty($value["file"])){
                    echo $value["summary"]; 
                }else{
                    //TODO:
                    echo "should put file content here.";
                }
            ?>
            </div>
        </div>
    </div>
    <?php } ?>
    
    <div class="row">
        <div class="col-xs-12">
            <div class="th_box">
                <textarea id="replyArea">haha</textarea>
            </div>
        </div>
    </div>
    
</main>