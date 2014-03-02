<?php
class DataBaseManager {

  private $connection;

  public function __construct($host, $dbname, $user, $password) {
    $connection = pg_connect('host='.$host.' dbname='.$dbname.' user='.$user.' password='.$password);
    if($connection == false)
      throw new Exception('Erreur : connexion à la base de données '.$dbname.' sur l\'hote '.$host.' impossible.'); 
  }

  public function __desctruct() {
    if($connection != false)
      pg_close($connection);
  }

  public function query($q) {
    return pg_query($connection, $q);
  }

}
?>