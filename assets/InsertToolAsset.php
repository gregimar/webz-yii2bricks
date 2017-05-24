<?php
namespace webz\bricks\assets;

use yii\web\AssetBundle;

class InsertToolAsset extends AssetBundle
{
    public $sourcePath = '@vendor/webz/yii2-bricks/assets/source';
    public $baseUrl = '@vendor/webz/yii2-bricks/assets/source';
    
    public $css = [
        'css/insertTool.css'
    ];
    public $js = [
        
    ];
    public $depends = [
    ];
}