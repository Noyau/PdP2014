<?php
$filename = explode('/', __FILE__);
$filename = $filename[count($filename) - 1];
$filename = str_replace('.php','',$filename);
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title><?php echo $head['title']; ?></title>
    <link rel="stylesheet" media="screen" type="text/css" href="<?php echo WEBROOT.'views/layouts/'.$filename.'.css'; ?>">
    <?php
       foreach($head['script'] as $script)
           echo '<script type="text/javascript" src="'.$script.'"></script>';
     ?>
  </head>
  <body onload="<?php echo 'loadScript(e)'; ?>">
    <?php echo $viewContent; ?>
  </body>
</html>
<?php
unset($filename);
?>
