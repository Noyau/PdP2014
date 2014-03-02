<?php
error_reporting(E_ALL);
ini_set('display_errors', E_ALL);

define('ROOT',    str_replace('index.php', '', $_SERVER['SCRIPT_FILENAME']));
define('WEBROOT', str_replace('index.php', '', $_SERVER['SCRIPT_NAME']));

include_once(ROOT.'core/Controller.php');
include_once(ROOT.'core/Model.php');
include_once(ROOT.'core/View.php');

$page   = null;
$action = null;

try {

  if(isset($_GET)) {
    if(isset($_GET['page']))
      $page   = htmlentities(addslashes($_GET['page']));

    if(isset($_GET['action']))
      $action = htmlentities(addslashes($_GET['action']));
  }

  if(is_null($page) || empty($page))
    $page  = 'home';

  if(is_null($action) || empty($action))
    $action = 'index';

  $controller = ucfirst($page);

  $controllerFilename = ROOT.'controllers/'.$controller.'.php';

  if(!file_exists($controllerFilename))
    throw new Exception('Erreur 404 : '.$controllerFilename);

  include_once($controllerFilename);

  $controller = new $controller();

  if(!method_exists($controller, $action))
    throw new Exception('Erreur 404 : '.get_class($controller).'->'.$action.'()');

  $controller->$action();

  unset($controllerFilename, $controller);

} catch(Exception $ex) {
  echo $ex->getMessage();
}

unset($page, $action);

echo '<p>Fin du traitement.</p>';

?>