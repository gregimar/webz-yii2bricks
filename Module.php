<?php
namespace webz\bricks;

use Yii;

class Module extends yii\base\Module
{
    public function init()
    {
        parent::init();
    }
    
    public $dbconfig = [
        'table_pages' => 'pages',
        'field_content' => 'content',
        'field_id' => 'id'
    ];
}

