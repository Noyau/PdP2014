<?php
class Controller {

  private $vars;
  private $layout;

  public function __construct($layout=null) {
    $this->vars   = array();
    $this->layout = $layout;
  }

  public function __destruct() {
    
  }

  public function setVar($v) {
    $this->vars   = array_merge($this->vars, $v);
  }

  public function render($viewName) {

    $viewClass = ucfirst($viewName);
    $viewPath  = ROOT.'views/'.$viewClass.'.php';

    if(!file_exists($viewPath))
      throw new Exception('Erreur 404 : '.$viewPath);

    $layoutPath = ROOT.'views/layouts/'.$this->layout.'.php';

    if(!file_exists($layoutPath))
      throw new Exception('Erreur 404 : '.$layoutPath);

    extract($this->vars);

    ob_start();
    require_once($viewPath);
    $viewContent = ob_get_clean();

    if(is_null($this->layout))
      echo $viewContent;
    else
      require_once($layoutPath);
  }

}
?>