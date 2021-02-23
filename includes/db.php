<?php

define('DB_HOST', 'us-cdbr-east-03.cleardb.com');
define('DB_USER', 'b7df017c7a4089');
define('DB_PASS', 'b090fcea');
define('DB_NAME', 'heroku_4bb80b22a8c6ab1');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

$query = "SET NAMES utf8";
mysqli_query($connection, $query);


// define('DB_HOST', 'localhost');
// define('DB_USER', 'root');
// define('DB_PASS', '');
// define('DB_NAME', 'mask-up');

// $connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// $query = "SET NAMES utf8";
// mysqli_query($connection, $query);


?>