<?php
use yii\helpers\Url;
?>
<div class="container">
    <div class="row">
        <div class="col-sm-12" id="bb-content-container">            
            <h1><?=$page->title?></h1>
            <div id="bb-content" class="bb-insertable">
                <?=$page->content?>                  
            </div>            
        </div>     
        <div class="col-sm-12 text-center mt10">
            <div class="bb-addElement btn btn-default btn-lg" data-toggle="modal" data-target="#bb-addElement" title="Add element"><i class="fa fa-plus"></i></div>
        </div>
    </div>
</div>
<?php
$js = "$('#bb-content-container').bbEditor();";
$this -> registerJs($js, yii\web\View::POS_END);