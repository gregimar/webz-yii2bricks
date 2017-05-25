<?php

namespace webz\bricks\assets;

use yii\web\AssetBundle;

class BricksAsset extends AssetBundle
{
    public $sourcePath = '@vendor/webz/yii2-bricks/assets/source';
    public $baseUrl = '@vendor/webz/yii2-bricks/assets/source';
    
    public $css = [
        'css/font-awesome/css/font-awesome.min.css',
        'css/style.css',
        'jquery-ui/jquery-ui.min.css'
    ];
    public $js = [
        'jquery-ui/jquery-ui.min.js',
        'tinymce/tinymce.min.js',        
        'js/script.js',
        'js/bbEditor.js'
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
        'yii\bootstrap\BootstrapPluginAsset',
    ];
}