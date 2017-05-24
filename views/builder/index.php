<?php
use yii\helpers\Url;
?>
<div class="container">
    <div class="row">
        <div class="col-sm-12">            
            <h1><?=$page->title?></h1>
            <div id="bb-content" class="bb-insertable">
                <?=$page->content?>                  
            </div> 
        </div>             
    </div>
</div>
<?php
$js = "$('#bb-content').bbEditor({insertToolCaller: 'bb-insertTool-open'});";
$this -> registerJs($js, yii\web\View::POS_END);