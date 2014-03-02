<?php
class Videoplayer extends DataBaseManager {
  
  public function __construct($host, $dbname, $user, $password) {
    parent::__construct($host, $dbname, $user, $password);
  }

  public function __desctruct() {
    parent::__desctruct();
  }

  public function addVideo($filepath, $thumbnailpath, $idtags) {
    $query = "";

    $this->query($query);
  }

}
?>