<?php

namespace backend\modules\bricks\assets;

use yii\web\AssetBundle;

class BricksAsset extends AssetBundle
{
    public $sourcePath = '@backend/modules/bricks/assets/source';
    public $baseUrl = '@backend/modules/bricks/assets/source';
    
    public $css = [
        'css/font-awesome/css/font-awesome.min.css',
        'css/style.css',
        'jquery-ui/jquery-ui.min.css'
    ];
    public $js = [
        'jquery-ui/jquery-ui.min.js',
        'js/script.js'       
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
        'yii\bootstrap\BootstrapPluginAsset',
    ];
}
