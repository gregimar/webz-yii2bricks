<?php
namespace webz\bricks\models;

use Yii;
use yii\db\ActiveRecord;

class Pages extends ActiveRecord
{
    public static $table_pages;
    public static $field_content;
    public static $field_id;
    
    public static function tableName()
    {
        return self::$table_pages;
    }

    public function rules()
    {
        return [
            [['name' ,'fields', 'rules','position'], 'required'],
            [['name','rules','fields','position','disabled'], 'string']
        ];
    } 
    
    public function attributeLabels()
    {
        return [
          
        ];
    }
    
    public static function get($id)
    {
        return self::find()
                -> where([
                    self::$field_id => $id
                ])
                -> one();
    }

}