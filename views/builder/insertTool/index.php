<ul class="nav nav-tabs">
    <li class="active"><a data-toggle="tab" href="#blocks">Blocks</a></li>
    <li><a data-toggle="tab" href="#other">Other</a></li>
</ul>

<div class="tab-content">
    <div id="blocks" class="tab-pane fade in active">
        <?=$this->render('elements/blocks')?>
    </div>    
    <div id="other" class="tab-pane fade in">
        <h1>Other</h1>
    </div>
</div>

<?php
$this->registerCssFile(Yii::$app->request->baseUrl.'/css/style.css');
?>