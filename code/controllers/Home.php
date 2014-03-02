<?php
class Home extends Controller {

  public function __construct() {
    parent::__construct(strtolower(get_class($this)));
  }

  public function __destruct() {
    parent::__destruct();
  }

  public function index() {
    $var = array();
    $var['page'] = array();
    $var['page']['title'] = 'Page d\'Accueil';
    $this->setVar($var);
    $this->render(get_class($this));
  }

}
?>