<?php
class Videoplayer extends Controller {

  public function __construct() {
    parent::__construct(strtolower(get_class($this)));
  }

  public function index() {
    $var = array('head'=>array(), 'body'=>array());
    $var['head']['title'] = 'Gobelin';
    $var['head']['script'] = array(
				   WEBROOT.'../lib/sprintf.js/src/sprintf.min.js',
				   WEBROOT.'scripts/'.strtolower(get_class($this)).'.js',
				   WEBROOT.'scripts/parser.js'
				   );
    $this->setVar($var);
    $this->render(get_class($this));
  }

}
?>