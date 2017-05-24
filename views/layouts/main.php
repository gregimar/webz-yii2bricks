<?php
use backend\modules\bricks\assets\BricksAsset;
use yii\helpers\Html;
use yii\helpers\Url;

/* @var $this yii\web\View */

BricksAsset::register($this);

?>
<?php $this->beginPage() ?>
    <!DOCTYPE html>
    <html lang="<?= Yii::$app->language ?>">
    <head>
        <meta charset="<?= Yii::$app->charset ?>"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <?=Html::csrfMetaTags() ?>
        <title><?= Html::encode($this->title) ?></title>
        <?php $this->head() ?>
    </head>
    <body>
    <?php $this->beginBody() ?>

        <?= $content ?>

    <?php $this->endBody() ?>
    </body>
    </html>
<?php $this->endPage() ?>