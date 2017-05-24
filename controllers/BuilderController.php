<?php
namespace webz\bricks\controllers;

use Yii;
use yii\web\Controller;
use webz\bricks\models\Pages;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use yii\web\NotFoundHttpException;
use common\helpers\ShortcodesHelper;

class BuilderController extends Controller
{
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['index'],
                'rules' => [
                    [
                        'actions' => ['index','inserttool'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    
                ],
            ],
        ];
    }
    
    public function beforeAction($action)
    {
        $this -> configureModel();
        
        //Disable assets cache
        Yii::$app->assetManager->forceCopy = true;
        
        return parent::beforeAction($action);
    }
    
    public function actionIndex($page_id)
    { 
        $this -> layout = 'main';
        
        $page = Pages::get($page_id);
        
        if(!$page)
        {
            throw new NotFoundHttpException("Can't find this page.");
        }
        
        $page -> content = ShortcodesHelper::doShortcodes($page->content);
        
        return $this->render('index', [
            'page' => $page
        ]);
    }
    
    public function actionInserttool()
    {
        $this -> layout = 'insertTool';
        
        return $this->render('insertTool/index', [
            
        ]);
    }
    
    private function configureModel()
    {
        Pages::$table_pages = $this -> module -> dbconfig['table_pages'];
        Pages::$field_content = $this -> module -> dbconfig['field_content'];  
        Pages::$field_id = $this -> module -> dbconfig['field_id'];
    }
    
    
}
